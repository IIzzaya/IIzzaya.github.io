/**
 * 画廊项目清单 —— ★ 新增项目只需在这里追加一条。
 * 字段含义与接入四步流程见仓库根目录 AGENTS.md §5。
 */
export interface GalleryProject {
  /** 主站路由 /projects/<slug>/ */
  slug: string;
  /** GitHub 仓库名，决定 iframe 嵌入地址 https://iizzaya.github.io/<repo>/ */
  repo: string;
  /** 展示名 */
  name: string;
  /** 一句话简介（卡片标题下） */
  tagline: string;
  /** 详细介绍（画廊页卡片/主页精选文案） */
  description: string;
  /** 技术徽章 */
  tags: string[];
  /** 卡片强调色（hex） */
  accent: string;
  /** 是否在主页精选区展示 */
  featured: boolean;
  /** 是否生成 /projects/<slug>/ iframe 嵌入路由 */
  embed: boolean;
  sourceUrl: string;
  /** 画廊卡片配图（建议 1200×630），路径相对 public/ */
  screenshot?: string;
}

export const PROJECTS: GalleryProject[] = [
  {
    slug: 'weiqi',
    repo: 'project-weiqi',
    name: '无边围棋 · Edgeless Go',
    tagline: '环面拓扑棋盘上的围棋——没有边与角，所有定式全部失效。',
    description:
      '19×19 棋盘左右上下相通的环面围棋：四周无限镜面虚影实时同步、可直接点击落子；简单劫 + 数子法终局计算；内置三档 MCTS AI（入门 / 进阶 / 高手）运行于 Web Worker。支持双人与人机、悔棋认输、存档续局、SGF 导出与复盘回放。',
    tags: ['Vue 3', 'TypeScript', 'Vite', 'MCTS AI', 'Web Worker'],
    accent: '#9a6bff',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-weiqi',
  },
  {
    slug: 'pixel-sails',
    repo: 'project-3d-pixel',
    name: 'Pixel Sails · 像素帆船',
    tagline: '分层切片伪 3D 的像素风航行收集游戏。',
    description:
      '程序化体素帆船逐层切片、沿 Y 轴堆叠成 1 体素厚的板层，配合低分辨率帧缓冲最近邻放大，任意旋转角度都保持手绘像素感的伪 3D。完整的航行玩法：风极曲线操舵、打捞货箱与宝箱、礁石与追踪水雷，以及像素海面、船体倒影与尾迹浪花。',
    tags: ['three.js', 'TypeScript', 'Vite', 'Pixel Art'],
    accent: '#40e0ff',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-3d-pixel',
  },
];
