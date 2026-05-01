# GPT-Image-2 Tools

[English](./README.md)

GPT-Image-2 Tools 是一个客户端 AI 图像生成 Playground，面向 `/v1/images/generations` API。项目基于 TanStack Start、React 19、TypeScript、Tailwind CSS v4 与 shadcn/Radix UI 构建。

## 在线预览

- 主站：[https://gpt-image-2.fishxcode.com](https://gpt-image-2.fishxcode.com)
- Lovable：[https://fishxcode-gpt-image-2.lovable.app/](https://fishxcode-gpt-image-2.lovable.app/)
- GitHub：[https://github.com/fishxcode/gpt-image-2.git](https://github.com/fishxcode/gpt-image-2.git)

## 功能

- 支持配置自定义图像生成 API 地址与 API Key。
- 在浏览器本地保存生成配置。
- 支持通过 URL 参数临时覆盖配置，便于分享 Playground 链接。
- 支持配置模型、尺寸、质量、输出格式、背景、响应格式与生成数量。
- 支持英文与简体中文界面切换。
- 提供提示词广场，可浏览并复用精选 prompt。
- 提供素材广场，可复用示例图像对应的 prompt。
- 内置 sitemap、robots 与 RSS 等 SEO 路由。
- 包含 Vite 与 Cloudflare 相关项目配置。

## 技术栈

- TanStack Start 与 TanStack Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/Radix UI
- Vite
- Cloudflare Vite 集成

## 快速开始

### 环境要求

- Node.js
- npm

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 开发模式构建

```bash
npm run build:dev
```

### 预览

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

### 格式化

```bash
npm run format
```

## 配置说明

在应用的设置面板中可以配置：

- API 地址，例如 `https://example.com/v1/images/generations`
- API Key
- 模型，默认 `gpt-image-2`
- 生成数量、尺寸、质量、响应格式、背景与输出格式

配置会通过 `localStorage` 保存在浏览器本地。URL 参数可以临时覆盖已保存配置，除非在界面中保存，否则不会持久化。

支持的 URL 参数包括 `apiUrl`、`apiKey`、`model`、`n`、`size`、`quality`、`responseFormat`、`background`、`outputFormat` 与 `prompt`。

请避免分享包含真实 API Key 的 URL。

## API 兼容性

Playground 会向配置的 API 地址发送带 Bearer Token 的 `POST` 请求，请求体遵循 `/v1/images/generations` 风格的图像生成参数。响应支持 `b64_json` 或 `url` 图像数据。

## 许可证

MIT。详见 [LICENSE](./LICENSE)。

## 贡献

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)、[SECURITY.md](./SECURITY.md) 与 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)。
