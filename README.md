# iizzaya.github.io

个人博客 + 前端项目画廊。Astro + Tailwind CSS 构建，设计魔改自 [farhad.my](https://www.farhad.my/) 的终端风格。

- **线上地址**：<https://iizzaya.github.io>
- **项目画廊**：<https://iizzaya.github.io/projects/>（iframe 嵌入各子项目）
- **维护指南**：见 [AGENTS.md](./AGENTS.md)（技术路线、目录约定、画廊项目接入四步法）

## 本地开发

```bash
pnpm install
pnpm dev        # 开发服务器
pnpm build      # astro check + 构建 → dist/
pnpm preview    # 预览构建产物
```

## 部署

推送到 `main` 即由 GitHub Actions 自动构建并发布到 GitHub Pages（Pages Source = GitHub Actions）。

子项目（`project-weiqi`、`project-3d-pixel`）为独立仓库、独立管线，主站仅通过 iframe 嵌入，见 AGENTS.md §5。
