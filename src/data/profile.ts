/** 个人资料：名字轮换、社交链接、About 内容 */
export const PROFILE = {
  /** 主页 Hero 打字机轮换的名字列表 */
  rotatingNames: ['izaya', 'イザヤ', 'IIzzaya'],

  /** Hero 副标语 */
  tagline:
    '这里记录我的折腾日常：工程技术笔记，以及一些可以直接在浏览器里玩的 Web 小项目。',

  /** 终端页头路径前缀装饰（farhad.my 风格） */
  terminalHost: 'iizzaya@github',

  social: [
    { name: 'GitHub', url: 'https://github.com/IIzzaya', icon: 'github' },
  ],

  /** About 页内容（占位骨架，直接改这里） */
  about: {
    intro: [
      '你好，我是 **izaya**，一名对图形、游戏与前端工程感兴趣的开发者。',
      '这个站点是我的自留地：写点技术笔记，也把做出来的 Web 小项目直接挂在画廊里供人把玩。',
    ],
    /** 技能/兴趣标签 */
    interests: [
      '实时渲染与图形学',
      '游戏开发',
      '前端工程化',
      'TypeScript',
      'Vue / Astro',
      'Node.js',
      'Unity / Shader',
    ],
    /** 经历时间线（占位，可自行增删） */
    timeline: [
      { year: '2018', text: '开始写技术博客，记录 Unity / Node.js / 数据库的学习笔记。' },
      { year: '2025', text: '站点重建：Astro + Tailwind，新增项目画廊，把能玩的项目直接搬上来。' },
    ],
    /** 联系方式（占位） */
    contact: 'GitHub 上提 Issue 或 Discussion 是找到我最快的方式。',
  },
} as const;
