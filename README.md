# StoneKit

石头鱼的工具箱（Tauri + Vue）。当前提供 SVG 文本转换为 Base64 / Data URL 的本地工具。

## 功能

- SVG → Base64
- SVG → Data URL
- 一键复制结果
- 本地处理，不上传

## 使用方式

1. 粘贴 SVG 文本
2. 点击“转换”
3. 复制 Base64 或 Data URL，并可在界面预览

提示：MVP 只做基础校验，需包含 `<svg>` 与 `</svg>`。

## 从源码运行

环境要求：

- Node.js
- pnpm
- Rust（Tauri 工具链）

安装与开发：

```bash
pnpm install
pnpm tauri dev
```

构建：

```bash
pnpm build
pnpm tauri build
```

macOS dmg：

```bash
pnpm build:dmg
```

说明：无需单独运行 `pnpm dev`，Tauri 会拉起前端开发服务。
