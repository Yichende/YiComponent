------

~~~markdown
# 🧱 @yichend/yi-pixel-component

A **pixel-style React UI component library** inspired by retro games. Carefully crafted with sharp edges, monospace fonts, and low-res aesthetics. Perfect for building nostalgic UIs or game-like web interfaces.

[![npm version](https://img.shields.io/npm/v/@yichend/yi-pixel-component.svg)](https://www.npmjs.com/package/@yichend/yi-pixel-component)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📦 Installation

Using **npm**:

```bash
npm install @yichend/yi-pixel-component
~~~

Using **yarn**:

```bash
yarn add @yichend/yi-pixel-component
```

Using **pnpm**:

```bash
pnpm add @yichend/yi-pixel-component
```

------

## 🚀 Quick Start

1. Import `Press Start 2P` font (required for pixel look):

```ts
import '@fontsource/press-start-2p'; // optional, but recommended
```

1. Import components you need:

```tsx
import { YiButton, Checkbox, ColorPicker } from '@yichend/yi-pixel-component';
```

1. Use in JSX:

```tsx
<YiButton>Start Game</YiButton>

<Checkbox value="apple" checked={true} onChange={() => {}}>
  Apple
</Checkbox>

<ColorPicker defaultValue="#fa8c16" onChange={(color) => console.log(color)} />
```

------

## 🧩 Available Components

| Component     | Description                                |
| ------------- | ------------------------------------------ |
| `YiButton`    | Pixel-style button with press feedback     |
| `Anchor`      | Floating anchor/navigation widget          |
| `Icon`        | Pixel-style SVG icon renderer              |
| `Breadcrumb`  | Breadcrumb with dropdown overflow support  |
| `Dropdown`    | Basic dropdown and dropdown item           |
| `Menu`        | Horizontal/vertical menu with icon/label   |
| `Pagination`  | Pagination bar with controls and inputs    |
| `Steps`       | Multi-step progress indicator              |
| `Tabs`        | Tab component with scroll/overflow support |
| `Radio`       | Pixel-style radio buttons                  |
| `Checkbox`    | Checkbox with indeterminate and select-all |
| `ColorPicker` | Full-featured pixel-style color selector   |

> 📌 More components in development...

------

## 🧱 Pixel Design Principles

- Retro pixelated UI using `Press Start 2P` or `Ark Pixel` font
- Pure CSS pixel borders and shadows
- No external UI dependencies
- Designed for React 18+

------

## 🧪 Development

To run locally:

```bash
pnpm install
pnpm dev
```

To view Storybook:

```bash
pnpm storybook
```

To build:

```bash
pnpm build
```

------

## 📘 License

MIT © [Yichend](https://github.com/Yichende)
