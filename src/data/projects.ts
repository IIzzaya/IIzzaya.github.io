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
    slug: 'pixel-frag',
    repo: 'project-pixel-frag-model',
    name: 'FRAG. · 像素英雄档案',
    tagline: '会旋转、解构与重组的三维像素勇者——参考影像的程序化体素再创作。',
    description:
      '依据 @ARTOFSULLY 参考影像重建的交互式三维像素英雄档案：头、身、四肢与剑盾八个部件建模为仅保留表面体素的单个 InstancedMesh，Three.js WebGPU 渲染、不可用时自动回退 WebGL 2 并显示实际后端。之勇者 / 暗影双形态一键切换，1.8 秒碎片解构与重组动画，碎片滑杆控制真实体素位置，复古像素模式降低渲染分辨率同时保留清晰像素边缘。支持环绕拖拽、缩放、自动旋转调速、漂浮精灵开关、全屏展示与透明 PNG 快照，点选画布后亦可用方向键与 +/−/Home 控制视角。',
    tags: ['React 19', 'three.js', 'WebGPU', 'Vinext'],
    accent: '#d5f880',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-pixel-frag-model',
  },
  {
    slug: 'brush-atlas',
    repo: 'project-brush',
    name: 'Brush Atlas · 笔刷图集',
    tagline: '三种生成笔刷的绘画游乐场——一笔画出纽约地铁、街道小人或 Gunpla 零件。',
    description:
      '按参考视频重建的生成式绘画工作台：NYC subway 笔刷沿笔迹铺开平行线路、站点、换乘标记与真实纽约站名，列车光标在线路上持续移动；little figures 笔刷沿手势排列步行、站立、举手、轮椅与宠物等建筑立面小人，带轻微动态；Gunpla components 笔刷程序化生成原创装甲零件、浇口连接与板件编号。笔迹经弧长重采样，种子随机数保证同一笔画稳定重现，静态画层缓存、列车单独绘制、小人以 12 Hz 更新。支持鼠标、触屏与触控笔压力输入，三种笔刷可叠加，自动构图、随机变体、网格开关、平移缩放与撤销重做，导出 2400 × 1968 PNG。',
    tags: ['React 19', 'Vinext', 'TypeScript', 'Canvas 2D'],
    accent: '#377b59',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-brush',
  },
  {
    slug: 'lucent-pocket',
    repo: 'project-plexiglas-case',
    name: 'LUCENT · Pocket / 01',
    tagline: '透明亚克力掌机的交互式 3D 材质实验室——转动、拆解、探索。',
    description:
      '根据参考视频重建的透明亚克力掌机材质实验室：程序化装配圆角前后盖、抛光边缘、螺丝与金属垫圈，深绿 PCB 带布线、过孔、丝印与 InstancedMesh 阻容元件，动态单色 LCD 实时显示示波数据；Three.js WebGPURenderer 渲染并自动回退 WebGL2。六种外壳颜色与自定义染色，透光率、粗糙度、折射率与光学厚度实时可调，六层平滑拆解、尺寸比例控制，日光 / 暗室 / 暖光摄影棚三种布光与曝光调节，支持拖拽旋转、四标准视角、自动旋转与 PNG 导出。',
    tags: ['React 19', 'three.js', 'WebGPU', 'Vinext'],
    accent: '#e8a363',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-plexiglas-case',
  },
  {
    slug: 'color-square',
    repo: 'project-color-square',
    name: 'COLOR SQUARE · 色彩方阵',
    tagline: '六色几何拼贴的生成式矢量动画——方形、八边形与箭头的无限运动。',
    description:
      '从六色几何拼贴参考图延展的实时矢量动画：确定性种子算法把 1×1、2×2、3×3 三种图块无缝铺满任意视口，箭头循环平移、圆点呼吸缩放、八边形错峰旋转，90° 旋转首尾轮廓重合、循环无跳帧；动画经 Web Animations API 直接驱动 SVG 元素，不经过 React 每帧重绘。空格暂停、R 重新构图、F 全屏沉浸，0.25×–2× 速度调节；遵循系统减少动态效果偏好，切后台自动暂停、回前台按原状态恢复。',
    tags: ['React 19', 'SVG', 'Web Animations API', 'Vinext'],
    accent: '#00f344',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-color-square',
  },
  {
    slug: 'halftone',
    repo: 'project-half-tone',
    name: 'HALFTONE · 夜行',
    tagline: '雨夜行车视角的实时半色调 / 像素 / 体素渲染实验。',
    description:
      '根据雨夜出租车参考影像风格重建的实时 3D 夜驾实验：真实透视摄像机沿程序化街区巡航，实例化灯窗与车流、驾驶舱、雨丝与湿路反光构成夜景；TSL 节点后处理把画面实时转化为半色调网点、像素采样或体素街区三种风格，WebGPU 与 WebGL2 共用同一套节点图。拖动环顾、滚轮前进，可调节颗粒尺寸、光晕、曝光、雨量、速度、驾驶舱与配色，四个预设一键切换，保存画面导出 PNG。',
    tags: ['React 19', 'three.js', 'WebGPU', 'TSL', 'Vinext'],
    accent: '#d8ee80',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-half-tone',
  },
  {
    slug: 'holo-card',
    repo: 'project-shiny-card',
    name: 'HOLO · 镭射卡片实验室',
    tagline: '可倾斜、可翻面的镭射卡片展台——GPU 蚀刻虹彩与五层视差。',
    description:
      '原生 WebGL 单画布合成的卡片材质实验室：五个虚拟深度平面（凹入底纹、蚀刻纹饰、透明角色、技能文字、固定边框）按观察方向分层采样形成 2.5D 视差，镭射色带随视角、角色色彩与局部浮雕实时变化，并限制在角色透明遮罩与金属纹理之内。烈空坐、喷火龙、洛奇亚、梦幻四张配色各异的卡片，提供原色镭射、棱镜虹彩、极光流彩三种材质与强度、层深调节；点击翻面查看原创哑光卡背，支持键盘调角与 reduced-motion 偏好。',
    tags: ['React 19', 'WebGL', 'Vinext', 'TypeScript'],
    accent: '#d9a441',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-shiny-card',
  },
  {
    slug: 'balance',
    repo: 'project-balance',
    name: 'Balance Lab · 球板平衡实验室',
    tagline: '真实运动方程驱动的双轴球板自平衡仿真——调 PID，看小球追上目标。',
    description:
      '物理驱动的双轴球板平衡控制实验室：实心球滚动动力学以 1/240 秒 RK4 积分推进，PID 闭环带积分抗饱和与轨迹加速度前馈，执行器为二阶惯性模型。定点、圆形、八字、花瓣与手动五种目标模式，可实时调节 PID 增益、注入速度扰动、切换开环/闭环；三维正交投影视窗与俯视图、位置误差—速度误差相图、倾角与控制力矩遥测曲线，支持 30 秒历史回看与 CSV 导出。',
    tags: ['React 19', 'Vinext', 'TypeScript', 'PID 控制'],
    accent: '#38bdf8',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-balance',
  },
  {
    slug: 'fluid-lab',
    repo: 'project-interactive-css',
    name: 'Fluid Lab · CSS 响应式实验室',
    tagline: '拖动滑块、点击示例，直观感受 clamp() / min() / max() 的流动响应式。',
    description:
      '交互式 CSS 流式尺寸实验室：Clamp Playground 提供最小值 / 最大值参考线、尺寸基线与实时曲线，拖动 320–1600px 模拟视口即可观看 clamp(112px, 8px + 15vw, 176px) 的真实计算结果；六张相互独立的示例卡片在手机与桌面宽度间 ping-pong 循环演示日常配方，支持键盘操作、减少动态效果偏好与一键复制可用 CSS。原生 JavaScript、CSS 与 SVG 实现，无前端框架。',
    tags: ['Vanilla JS', 'CSS', 'SVG', 'Vite'],
    accent: '#7963dc',
    featured: true,
    embed: true,
    sourceUrl: 'https://github.com/IIzzaya/project-interactive-css',
  },
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
