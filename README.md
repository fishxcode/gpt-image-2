# GPT-Image-2 Tools

[简体中文](./README.zh-CN.md)

GPT-Image-2 Tools is a client-side AI image generation playground for the `/v1/images/generations` API. It is built with TanStack Start, React 19, TypeScript, Tailwind CSS v4, and shadcn/Radix UI components.

## Online Demo

- Primary: [https://gpt-image-2.fishxcode.com](https://gpt-image-2.fishxcode.com)
- Lovable: [https://fishxcode-gpt-image-2.lovable.app/](https://fishxcode-gpt-image-2.lovable.app/)
- GitHub: [https://github.com/fishxcode/gpt-image-2.git](https://github.com/fishxcode/gpt-image-2.git)

## Features

- Configure a custom image generation API endpoint and API Key.
- Save generation settings locally in the browser.
- Override settings through URL parameters for shareable playground links.
- Generate images with configurable model, size, quality, output format, background, response format, and image count.
- Switch between English and Simplified Chinese UI.
- Browse curated prompts in the Prompt Plaza and reuse them in the playground.
- Browse sample assets in the Asset Gallery and reuse their prompts.
- Includes SEO routes for sitemap, robots, and RSS.
- Includes Vite and Cloudflare-related project configuration.

## Tech Stack

- TanStack Start and TanStack Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/Radix UI
- Vite
- Cloudflare Vite integration

## Getting Started

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Development Build

```bash
npm run build:dev
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Format

```bash
npm run format
```

## Configuration

Open Settings in the app to configure:

- API URL, for example `https://example.com/v1/images/generations`
- API Key
- Model, default `gpt-image-2`
- Image count, size, quality, response format, background, and output format

Settings are stored in the browser with `localStorage`. URL parameters can temporarily override saved settings without persisting them until saved in the UI.

Supported URL parameters include `apiUrl`, `apiKey`, `model`, `n`, `size`, `quality`, `responseFormat`, `background`, `outputFormat`, and `prompt`.

Avoid sharing URLs that contain real API keys.

## API Compatibility

The playground sends a `POST` request to the configured API URL with a bearer token and an image generation payload compatible with `/v1/images/generations` style endpoints. The response can contain `b64_json` or `url` image data.

## License

MIT. See [LICENSE](./LICENSE).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md), and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
