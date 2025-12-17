# 📦 @ui-demo/ui - 企业级 React + Vue 3 组件库

一个支持 React 19 和 Vue 3 的企业级组件库，提供高质量的 UI 组件和完整的类型支持。

## ✨ 特性

- 🎨 **双框架支持** - 同时支持 React 19 和 Vue 3
- 📦 **共享样式** - 统一的 SCSS 样式系统
- 🔤 **完整类型** - 100% TypeScript 支持
- 🧪 **完整测试** - Jest + Vitest 测试覆盖
- 📚 **详细文档** - Storybook 组件文档
- 🎯 **拟物化设计** - 现代拟物化交互设计

## 📋 组件列表

### 已完成 ✅

- **Button** - 按钮组件（React + Vue 3）
- **Icon** - 图标组件（React + Vue 3）

### 开发中 🔄

- **Input** - 输入框组件

### 待开发 ⏳

- Select、Checkbox、Radio、Textarea
- DatePicker、TimePicker、Upload
- Modal、Drawer、Toast、Alert
- Popover、Tooltip、Tabs、Breadcrumb
- Menu、Pagination、Tree、Cascader
- DynamicForm、VirtualTable、Skeleton

## 🚀 快速开始

### 安装

```bash
# 使用 pnpm（推荐）
pnpm install @ui-demo/ui

# 使用 npm
npm install @ui-demo/ui

# 使用 yarn
yarn add @ui-demo/ui
```

### React 中使用

```typescript
import { Button, Icon } from '@ui-demo/ui'

export function App() {
  return (
    <div>
      <Button type="primary">Click me</Button>
      <Icon name="check" />
    </div>
  )
}
```

### Vue 3 中使用

```vue
<template>
  <div>
    <VueButton type="primary">Click me</VueButton>
    <VueIcon name="check" />
  </div>
</template>

<script setup>
import { VueButton, VueIcon } from '@ui-demo/ui'
</script>
```

## 📦 依赖说明

### Peer Dependencies

这个库使用 peer dependencies 来避免重复安装依赖：

```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "vue": "^3.0.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true },
    "react-dom": { "optional": true },
    "vue": { "optional": true }
  }
}
```

**说明**：
- React 和 Vue 都是可选的 peer dependencies
- 如果你只使用 React 组件，不需要安装 Vue
- 如果你只使用 Vue 组件，不需要安装 React
- 你的项目中必须安装相应的框架

### 开发依赖

```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^5.1.1",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vue/test-utils": "^2.4.3",
    "@vitest/ui": "^1.0.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "vue": "^3.3.11",
    "vite": "^7.2.4",
    "vitest": "^1.0.4",
    "typescript": "~5.9.3",
    "sass": "^1.94.2"
  }
}
```

## 🛠️ 开发

### 安装依赖

```bash
# 在项目根目录
pnpm install

# 或在 packages/ui 目录
cd packages/ui
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
pnpm dev

# 启动 Storybook
pnpm storybook
```

### 构建

```bash
# 构建库
pnpm build

# 预览构建结果
pnpm preview
```

### 测试

```bash
# 运行所有测试
pnpm test

# 运行测试并显示 UI
pnpm test:ui

# 生成覆盖率报告
pnpm test:coverage
```

### 代码检查

```bash
# 运行 ESLint
pnpm lint

# 类型检查
pnpm type-check
```

## 📁 项目结构

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── index.tsx (React 组件)
│   │   │   ├── Button.vue (Vue 3 组件)
│   │   │   ├── Button.ts (共享类型)
│   │   │   ├── index.module.scss (共享样式)
│   │   │   ├── index.test.tsx (React 测试)
│   │   │   └── Button.test.vue (Vue 3 测试)
│   │   ├── Icon/
│   │   └── Input/
│   ├── styles/
│   │   ├── theme.scss (主题变量)
│   │   ├── variables.scss (全局变量)
│   │   └── mixins.scss (SCSS mixins)
│   └── index.ts (导出入口)
├── dist/ (构建输出)
├── vite.config.ts (Vite 配置)
├── vitest.config.ts (Vitest 配置)
├── tsconfig.json (TypeScript 配置)
└── package.json
```

## 🎨 样式系统

### 主题变量

所有组件都使用统一的主题变量，定义在 `src/styles/theme.scss`：

```scss
// 颜色
$global-primary-color: #007bff;
$global-success-color: #28a745;
$global-danger-color: #dc3545;
$global-warning-color: #ffc107;

// 间距
$global-spacing-unit: 8px;

// 字体
$global-font-size: 14px;
$global-font-weight: 400;

// 阴影
$global-dark-shadow: rgba(0, 0, 0, 0.2);
$global-light-source: rgba(255, 255, 255, 0.8);
```

### 使用主题

```scss
@use "../../styles/theme.scss" as theme;

.button {
  background-color: theme.$global-primary-color;
  color: theme.$global-primary-text;
  padding: theme.$global-spacing-unit * 1 theme.$global-spacing-unit * 2;
}
```

## 📖 文档

- [Vue 组件开发指南](../../memo/QA/VueComponentDevelopmentGuide.md)
- [技术栈规划](../../memo/QA/TechStack.md)
- [Vue 3 + React 战略](../../memo/QA/VueReactStrategy.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 遵循 [Vue 组件开发指南](../../memo/QA/VueComponentDevelopmentGuide.md)
- 编写完整的测试
- 更新相关文档
- 使用 [Git 提交规范](../../memo/GitCommitEmoji.md)

## 📄 许可证

ISC

## 👤 作者

zzg

---

**最后更新**：2025-12-17
