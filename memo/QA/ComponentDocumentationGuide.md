# 📚 组件文档展示指南

本指南说明如何在 VitePress 文档中展示 React 和 Vue 3 组件，以及推荐的交互方式。

## 📋 目录

1. [概述](#概述)
2. [组件架构](#组件架构)
3. [使用方式](#使用方式)
4. [最佳实践](#最佳实践)
5. [常见问题](#常见问题)

---

## 概述

### 核心组件

```
VitePress 文档系统
├── ReactWrapper.vue - 在 Vue 中渲染 React 组件
├── VueWrapper.vue - 在 Vue 中渲染 Vue 组件
└── FrameworkTabs.vue - 框架切换标签页
```

### 工作流程

```
Markdown 文档
    ↓
导入 React 和 Vue 组件
    ↓
使用 FrameworkTabs 展示
    ↓
用户可以切换框架查看
    ↓
显示对应框架的代码
```

---

## 组件架构

### 1. ReactWrapper.vue

**用途**：在 Vue 中渲染 React 组件

**原理**：
- 使用 React 18 的 `createRoot` API
- 在 Vue 组件的 DOM 节点中挂载 React 组件
- 自动处理生命周期和清理

**使用方式**：
```vue
<ReactWrapper
  :component="Button"
  :props="{
    children: 'Click me',
    type: 'primary',
    onClick: handleClick
  }"
/>
```

### 2. VueWrapper.vue

**用途**：在 Vue 中渲染 Vue 组件

**原理**：
- 使用 Vue 3 的 `<component :is>` 动态组件
- 直接渲染 Vue 组件

**使用方式**：
```vue
<VueWrapper
  :component="VueButton"
  :component-props="{
    type: 'primary',
    onClick: handleClick
  }"
>
  Click me
</VueWrapper>
```

### 3. FrameworkTabs.vue

**用途**：提供框架切换的标签页界面

**特性**：
- ⭐ 标签页切换（React / Vue 3）
- 📝 代码展示切换
- 🎨 美观的 UI 设计
- ⌨️ 键盘友好

**使用方式**：
```vue
<FrameworkTabs
  :react-component="Button"
  :react-props="{ children: 'Click me', type: 'primary' }"
  :vue-component="VueButton"
  :vue-props="{ type: 'primary' }"
/>
```

---

## 使用方式

### 方式 1：简单展示（推荐）

```vue
<script setup>
import { Button, VueButton } from '@ui-demo/ui'
</script>

<!-- 单个组件展示 -->
<FrameworkTabs
  :react-component="Button"
  :react-props="{ children: 'Click me', type: 'primary' }"
  :vue-component="VueButton"
  :vue-props="{ type: 'primary' }"
/>
```

### 方式 2：多个组件展示

```vue
<script setup>
import { Button, VueButton } from '@ui-demo/ui'

const buttons = [
  { type: 'default', label: 'Default' },
  { type: 'primary', label: 'Primary' },
  { type: 'success', label: 'Success' },
]
</script>

<!-- 多个组件展示 -->
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
  <FrameworkTabs
    v-for="btn in buttons"
    :key="btn.type"
    :react-component="Button"
    :react-props="{ children: btn.label, type: btn.type }"
    :vue-component="VueButton"
    :vue-props="{ type: btn.type }"
  >
    <template #default>{{ btn.label }}</template>
  </FrameworkTabs>
</div>
```

### 方式 3：带事件处理

```vue
<script setup>
import { Button, VueButton } from '@ui-demo/ui'

const handleClick = () => {
  alert('Button clicked!')
}
</script>

<!-- 带事件处理 -->
<FrameworkTabs
  :react-component="Button"
  :react-props="{
    children: 'Click me',
    type: 'primary',
    onClick: handleClick
  }"
  :vue-component="VueButton"
  :vue-props="{
    type: 'primary',
    onClick: handleClick
  }"
/>
```

---

## 最佳实践

### 1. 组织结构

```
apps/docs/components/
├── Button/
│   ├── index.md (旧版本，仅 React)
│   ├── index-new.md (新版本，React + Vue)
│   ├── ButtonIconDemo.tsx
│   └── ...
├── Input/
│   ├── index.md
│   └── ...
└── ...
```

### 2. 文档结构

```markdown
# 组件名

简介

## 导入

### React
\`\`\`ts
import { Component } from '@ui-demo/ui'
\`\`\`

### Vue 3
\`\`\`ts
import { VueComponent } from '@ui-demo/ui'
\`\`\`

## 基础用法

<FrameworkTabs ... />

## 各种变体

<div style="display: flex; gap: 12px; flex-wrap: wrap;">
  <FrameworkTabs ... />
  <FrameworkTabs ... />
</div>

## API

| 属性 | 描述 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| ... | ... | ... | ... |
```

### 3. 代码示例

```vue
<!-- ✅ 好的做法 -->
<FrameworkTabs
  :react-component="Button"
  :react-props="{
    children: 'Click me',
    type: 'primary',
    onClick: () => alert('Clicked!')
  }"
  :vue-component="VueButton"
  :vue-props="{
    type: 'primary',
    onClick: () => alert('Clicked!')
  }"
/>

<!-- ❌ 不好的做法 -->
<!-- 只展示 React 版本 -->
<ReactWrapper
  :component="Button"
  :props="{ children: 'Click me' }"
/>
```

### 4. 样式一致性

```vue
<!-- 使用统一的间距和布局 -->
<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
  <FrameworkTabs ... />
  <FrameworkTabs ... />
  <FrameworkTabs ... />
</div>
```

---

## 常见问题

### Q1: 如何在 FrameworkTabs 中传递复杂的 props？

```vue
<script setup>
const complexProps = {
  type: 'primary',
  size: 'large',
  disabled: false,
  loading: false,
  onClick: () => console.log('clicked'),
  style: { marginRight: '8px' }
}
</script>

<FrameworkTabs
  :react-component="Button"
  :react-props="complexProps"
  :vue-component="VueButton"
  :vue-props="complexProps"
/>
```

### Q2: 如何处理插槽内容？

```vue
<!-- React 使用 children prop -->
<FrameworkTabs
  :react-component="Button"
  :react-props="{ children: 'Click me', type: 'primary' }"
  :vue-component="VueButton"
  :vue-props="{ type: 'primary' }"
>
  <!-- Vue 使用默认插槽 -->
  Click me
</FrameworkTabs>
```

### Q3: 如何显示代码示例？

```vue
<!-- FrameworkTabs 内置了代码显示功能 -->
<!-- 点击"显示代码"按钮即可查看 -->
<FrameworkTabs
  :react-component="Button"
  :react-props="{ children: 'Click me' }"
  :vue-component="VueButton"
  :vue-props="{ }"
/>
```

### Q4: 如何自定义代码示例？

目前 FrameworkTabs 显示的是默认代码。如果需要自定义，可以：

1. 在 FrameworkTabs 中添加 `code` prop
2. 或者在文档中手动添加代码块

```vue
<!-- 手动添加代码块 -->
<FrameworkTabs ... />

### React 代码
\`\`\`tsx
<Button type="primary" onClick={handleClick}>
  Click me
</Button>
\`\`\`

### Vue 3 代码
\`\`\`vue
<VueButton type="primary" @click="handleClick">
  Click me
</VueButton>
\`\`\`
```

---

## 迁移指南

### 从旧版本迁移

**旧版本**（仅 React）：
```vue
<ReactWrapper
  :component="Button"
  :props="{ children: 'Click me', type: 'primary' }"
/>
```

**新版本**（React + Vue）：
```vue
<FrameworkTabs
  :react-component="Button"
  :react-props="{ children: 'Click me', type: 'primary' }"
  :vue-component="VueButton"
  :vue-props="{ type: 'primary' }"
/>
```

### 迁移步骤

1. 导入 Vue 组件
   ```vue
   import { VueButton } from '@ui-demo/ui'
   ```

2. 替换 ReactWrapper 为 FrameworkTabs
   ```vue
   <!-- 从 -->
   <ReactWrapper :component="Button" :props="..." />
   
   <!-- 到 -->
   <FrameworkTabs
     :react-component="Button"
     :react-props="..."
     :vue-component="VueButton"
     :vue-props="..."
   />
   ```

3. 调整 props 映射
   - React: `children` prop
   - Vue: 默认插槽

---

## 总结

### 推荐的文档展示方式

```
✅ 使用 FrameworkTabs 展示 React 和 Vue 版本
✅ 提供清晰的导入说明
✅ 展示各种变体和用法
✅ 提供完整的 API 文档
✅ 包含代码示例
```

### 关键要点

1. **统一展示** - 同时展示 React 和 Vue 版本
2. **易于切换** - 用户可以轻松切换框架
3. **代码可见** - 提供代码示例供参考
4. **一致性** - 保持文档风格一致

---

**最后更新**：2025-12-17
