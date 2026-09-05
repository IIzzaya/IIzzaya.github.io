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
}

export const PROJECTS: GalleryProject[] = [
  // 顺序即画廊展示顺序：最新在前，从新到旧（新增项目请插到数组最前面）
  {
    slug: 'wire-frame',
    repo: 'project-wire-frame',
    name: 'Perpetual · 生成机械实验台',
    tagline: '把齿轮、活塞与摆锤组合成永续循环的生成艺术机械装置。',
    description:
      '生成艺术机械编辑器：六类程序化部件——传动齿轮、惯性飞轮、往复活塞、谐振摆锤、涡轮转子、行星轨道——共享同一循环时钟，拖动布局、两两连线即可呈现动力流动。支持画布平移缩放与网格吸附、转数 / 相位 / 方向参数调节、复制与撤销重做，内置三个种子化预设，输入种子可重建对应构图。默认 12 秒循环，可暂停、定位进度与调速，「导出作品」输出 2200 × 1520 的当前帧 PNG；遵循系统的减少动态效果偏好。',
    tags: ['React 19', 'Vinext', 'TypeScript', 'Canvas 2D'],
    accent: '#df623b',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-wire-frame',
  },
  {
    slug: 'bof4',
    repo: 'project-bof4-storyline',
    name: '不变之物 · BoF IV Memory Atlas',
    tagline: '以原作四章串联龙与佛乌鲁双线旅程的《龙战士 IV》剧情回忆画廊。',
    description:
      '中文《龙战士 IV》全剧情回忆档案：70 个剧情节点（含双结局）、50 处地点、25 位带原作像素头像的人物与 8 段旅途拾遗。可拖动缩放的幻想世界地图支持点击地点与双线路线叠加；按章节和视角浏览、人物与事件互跳、重访同一地点，事件锚点可直接分享（如 /#m01）。内容整理自独立研究底稿，感想与原作事实分开标识，非官方粉丝回顾。',
    tags: ['React 19', 'Vinext', 'TypeScript', '交互地图'],
    accent: '#5e9c76',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-bof4-storyline',
  },
  {
    slug: 'bookmarks',
    repo: 'bookmark-manager',
    name: '收藏宇宙 · izaya',
    tagline: '把多年积累的网站、文章与灵感，安放进一个数字花园。',
    description: 'Launchpad 风格的个人收藏门户：按主题探索网站、文章与代码仓库，搜索和收藏常用入口。公开链接与原创笔记，原文 Markdown 和图片保存在独立的本地书房。',
    tags: ['Vite', 'JavaScript', 'Markdown', 'Digital Garden'],
    accent: '#a5b8fa',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/bookmark-manager',
  },
  {
    slug: 'qing-font',
    repo: 'project-qing-font',
    name: '清骨隸 · Qinggu Li',
    tagline: '取意金农隶书的现代隶意字体与互动研究室。',
    description:
      '基于 Make Me a Hanzi / Arphic 笔画骨架重新构建厚横、瘦直与方折轮廓的衍生字体（非原迹复刻）：交付简繁双版 TTF/WOFF2，各覆盖底本 1,000 字全文并附可下载字体包与授权。网页研究室支持自由试字（简繁切换、字级字距、格线、直排、深浅底）、与 TTF 同源的逐笔播放 / 拖动 / 原始骨架叠合比较，以及简繁《千字文》全文、字格、寻字与收字统计。',
    tags: ['React 19', 'Vinext', 'TypeScript', '字体设计'],
    accent: '#5e8caa',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-qing-font',
  },
  {
    slug: 'jelly',
    repo: 'project-jelly',
    name: 'Jelly Atelier · 果冻工坊',
    tagline: '一颗会呼吸的 WebGPU 果冻——拍一下，看它怎么抖。',
    description:
      'Three.js WebGPURenderer 实时渲染的交互式果冻玩具：程序化竖纹几何 + 物理透射 / 衰减 / 清漆材质与影棚灯光；CPU 上的阻尼弹簧控制形变、重力积分处理弹跳与地面碰撞，WebGPU 不可用时自动回退 WebGL2。四种果味实时换色、柔软度滑杆调节抖动，空格键拍击、拖动旋转视角，可暂停模拟或重置镜头；遵循 reduced-motion 偏好自动关闭环境动画。',
    tags: ['React 19', 'three.js', 'WebGPU', 'Vinext'],
    accent: '#e94b55',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-jelly',
  },
  {
    slug: 'temple',
    repo: 'project-temple',
    name: '木构 MOKUZŌ · 净土堂建筑解构',
    tagline: '净土寺净土堂木构建筑的交互式 3D 结构解构档案。',
    description:
      '依据净土寺净土堂手绘详图复原的交互式建筑研究模型：整体、分层拆解与五类构件（屋面椽架 / 斗栱出挑 / 柱与贯梁 / 格扇板壁 / 台基地栿）均可独立查看，拆解进度连续可调，构件可显隐与点击选择；支持拖动旋转、滚轮缩放、透视/正视/俯视切换、自动旋转与线框模式。参数化几何由 three.js 实时渲染，榫卯与斗栱承托关系按图纸示意表达。',
    tags: ['React 19', 'three.js', 'TypeScript', 'WebGL'],
    accent: '#e0a458',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-temple',
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
];
