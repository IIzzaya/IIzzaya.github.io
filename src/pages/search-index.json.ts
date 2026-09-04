/**
 * Ctrl+K 命令面板的构建期静态索引：/search-index.json
 * 覆盖静态页面、项目（含嵌入路由）、全部博文与标签。
 */
import { getCollection } from 'astro:content';
import { PROJECTS } from '../data/projects';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];

  const items = [
    { title: '首页', href: '/', type: '页面', hint: '~/' },
    { title: '博客', href: '/blog/', type: '页面', hint: '~/blog' },
    { title: '标签', href: '/tags/', type: '页面', hint: '~/tags' },
    { title: '项目画廊', href: '/projects/', type: '页面', hint: '~/projects' },
    { title: '关于', href: '/about/', type: '页面', hint: '~/about' },
    ...PROJECTS.flatMap((p) => [
      { title: p.name, href: `/projects/${p.slug}/`, type: '项目', hint: p.tagline },
      ...(p.embed
        ? []
        : [{ title: `${p.name}（源码）`, href: p.sourceUrl, type: '项目' }]),
    ]),
    ...tags.map((t) => ({ title: `#${t}`, href: `/tags/${t}/`, type: '页面', hint: '标签' })),
    ...posts.map((p) => ({
      title: p.data.title,
      href: `/blog/${p.id}/`,
      type: '文章',
      hint: p.data.pubDate.toISOString().slice(0, 10),
    })),
  ];

  return new Response(JSON.stringify({ items }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
