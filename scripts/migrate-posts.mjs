/**
 * 一次性迁移脚本：把旧 Jekyll `_posts/*.md` 迁移为 Astro content collection 格式。
 *
 *  - frontmatter: layout/categories/last_updated → title/pubDate/tags/updatedDate/description
 *  - slug:        中文标题转拼音 + ASCII 词混合，日期前缀，全小写短横线
 *  - 正文清洗:    kramdown TOC / 行内属性列表 {:...} / &nbsp; 缩进
 *  - 图片:        posts_assets/ 本地图复制到 public/assets/images/<slug>/，外链图记录到报告
 *  - 报告:        scripts/migration-report.md（slug 映射 + 失效外链检测）
 *
 * 用法: pnpm exec node scripts/migrate-posts.mjs
 * 幂等：重复运行会先清空 src/content/blog 下的 .md 再生成。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pinyin } from 'pinyin-pro';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, '_posts');
const OUT_DIR = path.join(ROOT, 'src', 'content', 'blog');
const ASSETS_OUT = path.join(ROOT, 'public', 'assets', 'images');
const POSTS_ASSETS = path.join(ROOT, 'posts_assets');
const REPORT_PATH = path.join(__dirname, 'migration-report.md');

// ---------- utils ----------

/** 从文件名取日期与旧 slug：2018-04-09-xxx.md */
function parseFilename(name) {
  const m = /^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/.exec(name);
  if (!m) return null;
  return { date: `${m[1]}-${m[2]}-${m[3]}`, oldSlug: m[4] };
}

/** 极简 frontmatter 解析（旧文章结构固定，无需完整 YAML） */
function parseFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^(\w[\w_]*):\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const [, key, raw] = kv;
    const val = raw.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: m[2] };
}

/** 标题 → 英文 slug（ASCII 词优先，中文转拼音，截断 48 字符） */
function makeSlug(title) {
  const ascii = title
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  let parts = ascii;
  if (parts.join('-').length < 6) {
    const py = pinyin(title, { toneType: 'none', type: 'array', nonZh: 'consecutive' })
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
    parts = py;
  }
  let slug = parts.join('-').replace(/^-+|-+$/g, '');
  if (slug.length > 48) slug = slug.slice(0, 48).replace(/-[^-]*$/, '');
  return slug || 'post';
}

/** 正文清洗 */
function cleanBody(body, slug) {
  let out = body;
  // kramdown TOC 块
  out = out.replace(/^\* Kramdown table of contents\s*$/gm, '');
  out = out.replace(/^\{:\s*toc[^}]*\}\s*$/gm, '');
  // 行内属性列表（单独成行的 {:...}）
  out = out.replace(/^[ \t]*\{:[^}]*\}[ \t]*$/gm, '');
  // 段首 &nbsp; 缩进
  out = out.replace(/^((?:&nbsp;)+)/gm, '');
  // 本地图片路径 → 站点绝对路径
  out = out.replaceAll('posts_assets/', `/assets/images/${slug}/`);
  // 连续空行压缩
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim() + '\n';
}

/** 提取描述：第一个非标题/非引用/非图片的段落 */
function extractDescription(body) {
  const lines = body.split(/\r?\n/);
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^#|!\[|^>|^---|^\{:/.test(t)) continue;
    const text = t
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/&nbsp;/g, '')
      .trim();
    if (text.length < 8) continue;
    return text.length > 90 ? text.slice(0, 90) + '…' : text;
  }
  return undefined;
}

function collectTags(data) {
  const cats = Array.isArray(data.categories) ? data.categories : [];
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const all = [...cats, ...tags]
    .map((t) => String(t).trim().toLowerCase().replace(/\s+/g, '-'))
    .filter((t) => t && t !== 'untagged' && t !== 'uncategorized');
  return [...new Set(all)];
}

function parseUpdated(raw, fileDate) {
  // 旧格式 dd/mm/yy
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/.exec(String(raw || '').trim());
  if (!m) return undefined;
  const y = 2000 + Number(m[3]);
  const d = new Date(Date.UTC(y, Number(m[2]) - 1, Number(m[1])));
  if (Number.isNaN(d.getTime())) return undefined;
  const iso = d.toISOString().slice(0, 10);
  return iso >= fileDate ? iso : undefined;
}

// ---------- main ----------

const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith('.md'));
fs.mkdirSync(OUT_DIR, { recursive: true });
for (const f of fs.readdirSync(OUT_DIR)) if (f.endsWith('.md')) fs.unlinkSync(path.join(OUT_DIR, f));

const usedSlugs = new Set();
const report = { migrated: [], externalImages: [], copiedAssets: 0 };
const externalUrlSet = new Set();

for (const file of files) {
  const info = parseFilename(file);
  if (!info) {
    console.warn(`跳过（文件名不符合 Jekyll 约定）: ${file}`);
    continue;
  }
  const raw = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
  const { data, body } = parseFrontmatter(raw);

  const baseSlug = makeSlug(data.title || info.oldSlug);
  let slug = `${info.date}-${baseSlug}`;
  let n = 2;
  while (usedSlugs.has(slug)) slug = `${info.date}-${baseSlug}-${n++}`;
  usedSlugs.add(slug);

  // 本地图片复制（posts_assets/<name> → public/assets/images/<slug>/<name>）
  const assetDir = path.join(ASSETS_OUT, slug);
  const assetRefs = [...body.matchAll(/posts_assets\/([^\s)\"]+\.(?:png|jpe?g|gif|webp|svg))/gi)];
  for (const [, name] of assetRefs) {
    const src = path.join(POSTS_ASSETS, decodeURIComponent(name.trim()));
    if (fs.existsSync(src)) {
      fs.mkdirSync(assetDir, { recursive: true });
      fs.copyFileSync(src, path.join(assetDir, path.basename(src)));
      report.copiedAssets++;
    }
  }

  // 外链图片收集
  for (const m of body.matchAll(/!\[[^\]]*\]\((https?:[^)\s]+)[^)]*\)/g)) {
    externalUrlSet.add(m[1]);
    report.externalImages.push({ file, url: m[1], slug });
  }

  const fm = [
    '---',
    `title: ${JSON.stringify(data.title || info.oldSlug)}`,
    `pubDate: ${info.date}`,
  ];
  const updated = parseUpdated(data.last_updated, info.date);
  if (updated) fm.push(`updatedDate: ${updated}`);
  const desc = extractDescription(body);
  if (desc) fm.push(`description: ${JSON.stringify(desc)}`);
  const tags = collectTags(data);
  if (tags.length) fm.push(`tags: [${tags.join(', ')}]`);
  fm.push('---');

  const out = fm.join('\n') + '\n\n' + cleanBody(body, slug) + '\n';
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), out, 'utf8');
  report.migrated.push({ file, slug, title: data.title || info.oldSlug });
}

// 外链图片可用性检测（并发 + 8s 超时）
console.log(`检测 ${externalUrlSet.size} 个外链图片…`);
const urlStatus = new Map();
await Promise.all(
  [...externalUrlSet].map(async (url) => {
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000), redirect: 'follow' });
      urlStatus.set(url, res.ok ? 'ok' : `HTTP ${res.status}`);
    } catch (e) {
      urlStatus.set(url, `失败: ${String(e?.cause?.code || e?.name || e).slice(0, 40)}`);
    }
  })
);

// 报告
const lines = [
  '# 旧文迁移报告',
  '',
  `- 迁移文章数：**${report.migrated.length}**`,
  `- 复制本地图片：**${report.copiedAssets}** 张`,
  `- 外链图片引用：**${report.externalImages.length}** 处（去重 ${externalUrlSet.size} 个 URL）`,
  '',
  '## Slug 映射',
  '',
  '| 原文件 | 新 slug |',
  '| --- | --- |',
  ...report.migrated.map((r) => `| ${r.file} | \`${r.slug}\` |`),
  '',
  '## 外链图片状态',
  '',
];
for (const [url, status] of urlStatus) {
  const where = report.externalImages.filter((e) => e.url === url).map((e) => e.slug);
  lines.push(`- ${status === 'ok' ? '✅' : '❌'} \`${status}\` ${url}（用于: ${where.join(', ')}）`);
}
fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n', 'utf8');
console.log(`完成：${report.migrated.length} 篇 → ${OUT_DIR}`);
console.log(`报告 → ${REPORT_PATH}`);
