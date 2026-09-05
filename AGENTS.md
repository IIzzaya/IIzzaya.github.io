# AGENTS.md — IIzzaya.github.io 开发与迭代指南

> 本文件面向未来的维护者（人类与 AI Agent），记录站点的技术路线、架构约定与常见迭代操作。
> 修改站点架构或新增顶级功能时，请同步更新本文件。

## 1. 项目概览

个人博客 + 前端项目画廊，部署于 GitHub Pages。设计高仿 [farhad.my](https://www.farhad.my/) 魔改：

- **纯深色主题**（zinc-950 系），**没有**明暗切换，勿添加
- **中文 UI**（文章与界面均为中文；终端装饰元素等保留英文风格）
- 无评论系统、无访问统计、默认域名，不要引入第三方 SaaS

### 命名规范（重要）

- GitHub 账号 / 组织名：`IIzzaya`（大写开头两个 I）
- 站点域名：`https://iizzaya.github.io`（小写两个 i，**不是** iiizzaya）
- 主页名字轮换列表：`izaya / イザヤ / IIzzaya`（配置于 `src/data/profile.ts`）
- 终端页头提示符：`iizzaya@github:~$`

## 2. 仓库拓扑（多仓库模型）

| 仓库 | 内容 | 部署地址 |
| --- | --- | --- |
| `IIzzaya/IIzzaya.github.io` | Astro 主站（本仓库） | `https://iizzaya.github.io` |
| `IIzzaya/project-weiqi` | 无边围棋（Vue3+Vite+TS，环面围棋） | `https://iizzaya.github.io/project-weiqi/` |
| `IIzzaya/project-3d-pixel` | Pixel Sails（three.js 像素帆船游戏） | `https://iizzaya.github.io/project-3d-pixel/` |
| `IIzzaya/project-temple` | 木构 MOKUZŌ（React+three.js 建筑解构） | `https://iizzaya.github.io/project-temple/` |
| `IIzzaya/project-jelly` | Jelly Atelier（React+three.js WebGPU 果冻玩具，vinext） | `https://iizzaya.github.io/project-jelly/` |
| `IIzzaya/project-qing-font` | 清骨隸 Qinggu Li（React+vinext 隶书字体研究室） | `https://iizzaya.github.io/project-qing-font/` |
| `IIzzaya/bookmark-manager` | 收藏宇宙（Vite 静态书签门户，本地私人归档独立） | `https://iizzaya.github.io/bookmark-manager/` |

子项目仓库与主站**完全独立**：各自源码、各自 Actions 管线。主站只通过 **iframe** 嵌入其 Pages 产物（同域名，天然同源，localStorage 等均可用）。

本地开发副本约定位于 `D:\Projects\<repo-name>\`。

## 3. 技术栈与目录结构

- **Astro**（静态输出）+ **Tailwind CSS**（v4，经 `@tailwindcss/vite` 插件）+ **TypeScript**
- 包管理器：**pnpm**
- 命令面板（Ctrl+K）：构建期生成静态索引 JSON，运行时原生 Web Components/轻量脚本，不引 React

```
IIzzaya.github.io/
├── AGENTS.md                  # 本文件
├── astro.config.mjs           # site: https://iizzaya.github.io
├── src/
│   ├── components/            # TerminalHeader / CommandPalette / FloatingTechIcons / ProjectCard ...
│   ├── content/
│   │   ├── config.ts          # blog collection schema
│   │   └── blog/              # 博文 Markdown（frontmatter 见 §4）
│   ├── data/
│   │   ├── site.ts            # 站点元信息、导航
│   │   ├── profile.ts         # 名字轮换、社交链接、About 内容
│   │   └── projects.ts        # 画廊项目清单（★新增项目改这里）
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro        # 主页：Hero + 最新文章 + 精选项目
│   │   ├── blog/index.astro   # 博客列表
│   │   ├── blog/[...slug].astro
│   │   ├── tags/index.astro、tags/[tag]/...
│   │   ├── projects/index.astro        # 画廊
│   │   ├── projects/[slug]/index.astro # iframe 全屏嵌入路由
│   │   ├── about.astro
│   │   └── 404.astro
│   ├── styles/global.css      # Tailwind 入口 + 设计 token
│   └── utils/
├── public/                    # 静态资源（favicon、图片）
├── scripts/migrate-posts.mjs  # 2018 旧 Jekyll 文章一次性迁移脚本（保留备查）
└── .github/workflows/deploy.yml
```

## 4. 博文约定

`src/content/blog/*.md` frontmatter schema（`src/content/config.ts`）：

```yaml
---
title: 文章标题
pubDate: 2018-04-09        # ISO 日期
description: 可选摘要
tags: [nodejs, express]    # 小写、短横线
---
```

- URL 形如 `/blog/<slug>/`，slug 为英文短横线小写（迁移脚本已把旧中文标题转写）
- 旧文中的 kramdown 残留（`{:toc}`、`&nbsp;` 缩进）已在迁移时清洗；新文章直接用标准 Markdown
- 图片放 `public/assets/images/<slug>/`，正文用相对根路径 `/assets/images/...` 引用
- 新增文章后**无需**手动更新索引：博客列表、RSS、sitemap、Ctrl+K 索引均在构建期从 collection 生成

## 5. ★ 如何新增一个画廊项目（如 project-weiqi 模式）

以新增假想项目 `project-foo` 为例，共四步：

### 第 1 步：子项目自身满足「可嵌入」约束

子项目是独立仓库的 Vite 静态 SPA，必须满足：

1. `vite.config.ts` 使用 `base: './'`（相对路径，才能在 `/project-foo/` 子路径下工作）
2. 客户端路由用 hash（`#/...`）或无路由；**不要**依赖 history 路由的子路径
3. 不引用绝对路径资源（`/foo.png` ✗）；全部走模块导入或相对路径
4. `pnpm build` 产出纯静态 `dist/`，无服务端依赖
5. 若用 Web Worker，配置 `worker: { format: 'es' }`

### 第 2 步：子项目仓库加 Actions 工作流

在子项目仓库建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

仓库设置：Settings → Pages → Source 选 **GitHub Actions**（首次可用 `gh api` 或网页设置）。本地 `pnpm build && pnpm preview` 先自测一遍产物可从子路径访问。

### 第 3 步：主站登记项目

编辑 `src/data/projects.ts`，追加一条：

```ts
{
  slug: 'foo',                       // 主站路由 /projects/foo/
  repo: 'project-foo',               // GitHub 仓库名（决定 embed URL）
  name: 'Foo',                       // 展示名
  tagline: '一句话中文简介',
  description: '两三句介绍：玩法/亮点/技术。',
  tags: ['Vue3', 'Vite', 'TS'],      // 卡片上的技术徽章
  accent: '#9a6bff',                 // 卡片强调色
  featured: true,                    // 是否主页精选
  embed: true,                       // true = 生成 /projects/foo/ iframe 路由
  sourceUrl: 'https://github.com/IIzzaya/project-foo',
}
```

画廊页 `/projects/` 与嵌入路由 `/projects/[slug]/` 均由此数据文件驱动；`embed: true` 的项目自动获得 iframe 路由（顶栏保留主站导航 + 「新窗口打开」「查看源码」按钮）。

### 第 4 步：验证

```bash
pnpm build && pnpm preview    # 主站本地确认画廊卡片 + /projects/foo/ iframe 可玩
```

推送后线上确认 `https://iizzaya.github.io/projects/foo/` 与子项目自身地址均正常。

## 6. 设计语言（魔改自 farhad.my）

- 背景 `zinc-950`，正文 `zinc-100/zinc-300`，主强调色绿色（`green-400/500` 辉光）
- 终端页头：等宽字体 `user@host:~/path` + 闪烁块状光标（`cursor-blink` 动画），路径随当前路由变化
- 主页 Hero：`Hi, I'm <名字轮换>`，打字机效果轮换 `profile.ts` 中的名字列表
- 背景：漂浮发光的技术栈 SVG 图标（低透明度缓慢浮动，`site.ts` 配置图标清单）
- 内容栏：`max-w-3xl / xl:max-w-5xl` 居中
- 卡片/按钮：细边框 `zinc-800`、hover 辉光，尽量少圆角突变
- 图标用内联 SVG（技术栈 logo 存 `public/static/tech-logos/`），不引图标字体

## 7. 部署管线

- **主站**：push 到 `main` → `.github/workflows/deploy.yml`（`withastro/action` + `actions/deploy-pages`）→ Pages。仓库 Pages Source 必须是 **GitHub Actions**（历史遗留的 Jekyll 分支构建已废弃）
- **子项目**：各自仓库同上（见 §5 第 2 步）
- 本地验证：`pnpm build && pnpm preview`；主站构建含 `astro check`（类型 + 诊断）
- 部署排错顺序：Actions 日志 → Pages Source 是否 Actions → 子项目 `base` 是否 `./` → 浏览器控制台混合内容/路径 404

## 8. 给 AI Agent 的操作提醒

1. 改动后必须跑 `pnpm build`（含 astro check）再交付；样式改动用 `pnpm preview` 人工过一眼主页/博客/画廊/嵌入页四类页面
2. 新增页面后检查：导航（`site.ts`）与 Ctrl+K 索引是否自动覆盖；未覆盖的静态页面需登记
3. 保持**纯深色**与**中文 UI** 约定；不要顺手加明暗切换、评论、统计
4. 涉及子项目仓库的操作在 `D:\Projects\<repo>\` 内进行并各自提交；主站仓库不含任何子项目源码
5. `scripts/migrate-posts.mjs` 是一次性历史迁移工具，除非迁移逻辑需修正，否则不要删除也不要在构建中引用
6. Git 历史：2025 重建时以本地单提交为基础 force push 过一次远端；旧 Jekyll 站点内容只存在于那次之前的本地历史中
