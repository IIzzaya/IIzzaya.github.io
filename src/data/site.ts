/** 站点全局元信息与导航 */
export const SITE = {
  /** 站点名（终端页头 host 部分） */
  title: 'iizzaya',
  /** 终端页头 user 部分 */
  user: 'iizzaya',
  description: 'iizzaya 的个人博客与前端项目画廊——记录、折腾、把好玩的东西放到浏览器里。',
  /** 部署域名，与 astro.config.mjs 的 site 保持一致 */
  url: 'https://iizzaya.github.io',
  author: 'iizzaya',
  lang: 'zh-CN',
} as const;

/** 顶部导航（顺序即展示顺序） */
export const NAV = [
  { text: '首页', href: '/' },
  { text: '博客', href: '/blog/' },
  { text: '标签', href: '/tags/' },
  { text: '项目', href: '/projects/' },
  { text: '关于', href: '/about/' },
] as const;

/**
 * 背景漂浮发光的技术栈图标清单。
 * 每一项对应 public/static/tech-logos/<name>.svg
 */
export const FLOATING_ICONS = [
  'vue',
  'typescript',
  'vite',
  'nodejs',
  'threejs',
  'astro',
  'docker',
  'unity',
] as const;

/** 页脚版权起始年份 */
export const COPYRIGHT_START_YEAR = 2018;
