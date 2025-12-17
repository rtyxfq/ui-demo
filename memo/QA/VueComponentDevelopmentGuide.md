# 🎯 Vue 3 组件开发指南

## 📋 目录
1. [概述](#概述)
2. [项目结构](#项目结构)
3. [开发流程](#开发流程)
4. [Button 组件示例](#button-组件示例)
5. [最佳实践](#最佳实践)
6. [常见问题](#常见问题)

---

## 概述

本指南说明如何基于现有的 React 组件开发对应的 Vue 3 版本。

### 核心原则

```
1. 共享样式 - 使用相同的 SCSS 文件
2. 共享类型 - 使用相同的 TypeScript 类型定义
3. 共享逻辑 - 提取通用的业务逻辑
4. 框架特定 - 使用各框架的最佳实践
```

---

## 项目结构

### 组件目录结构

```
packages/ui/src/components/Button/
├── index.tsx                    # React 组件
├── Button.vue                   # Vue 3 组件
├── Button.ts                    # 共享类型和工具函数
├── index.module.scss            # 共享样式
├── index.test.tsx               # React 测试
└── Button.test.vue              # Vue 3 测试
```

### 导出方式

```typescript
// packages/ui/src/index.ts

// React 导出
export { Button } from './components/Button/index.tsx'

// Vue 3 导出
export { default as VueButton } from './components/Button/Button.vue'

// 共享导出
export * from './components/Button/Button'  // 类型和工具函数
```

---

## 开发流程

### 第一步：分析 React 组件

```typescript
// 1. 理解 props 接口
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'default' | 'success' | 'danger' | 'warning' | 'text' | 'link'
  disabled?: boolean
  size?: 'default' | 'mini' | 'small' | 'medium' | 'large'
  loading?: boolean
  spin?: boolean
  href?: string
  target?: string
}

// 2. 理解状态管理
const [isPressed, setIsPressed] = useState(false)

// 3. 理解事件处理
const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => { ... }

// 4. 理解条件渲染
if (href) {
  return <a>...</a>
}
return <button>...</button>
```

### 第二步：提取共享类型

```typescript
// Button.ts - 共享类型定义
export interface ButtonProps {
  type?: 'primary' | 'default' | 'success' | 'danger' | 'warning' | 'text' | 'link'
  disabled?: boolean
  size?: 'default' | 'mini' | 'small' | 'medium' | 'large'
  loading?: boolean
  spin?: boolean
  href?: string
  target?: string
  class?: string | string[] | Record<string, boolean>
  style?: Record<string, any>
}

// 共享工具函数
export function getButtonClasses(
  props: ButtonProps,
  styles: Record<string, string>,
  isPressed: boolean = false
): string {
  // 类名组合逻辑
}
```

### 第三步：开发 Vue 3 组件

```vue
<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="buttonClasses"
    :href="href"
    :target="target"
    :disabled="!href && disabled"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUpOrLeave"
    @mouseleave="handleMouseUpOrLeave"
    @click="$emit('click', $event)"
  >
    <Icon v-if="loading" name="loading" :spin="spin" />
    <slot>Button</slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '../Icon'
import type { ButtonProps } from './Button'
import styles from './index.module.scss'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  disabled: false,
  size: 'default',
  loading: false,
  spin: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const isPressed = ref(false)

const handleMouseDown = () => {
  if (props.disabled) return
  isPressed.value = true
}

const handleMouseUpOrLeave = () => {
  if (props.disabled) return
  isPressed.value = false
}

const buttonClasses = computed(() => {
  const sizeClass = props.size !== 'default' ? styles[props.size] : ''
  
  return [
    styles.button,
    props.disabled ? styles.disabled : '',
    isPressed.value ? styles.pressed : '',
    styles[props.type || 'default'],
    props.class,
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<style module="styles" lang="scss">
// 使用相同的样式文件
@use "sass:color";
@use "../../styles/theme.scss" as theme;
// ... 样式代码
</style>
```

### 第四步：编写测试

```typescript
// Button.test.vue
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renders button with default props', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders as link when href is provided', () => {
    const wrapper = mount(Button, {
      props: { href: 'https://example.com' },
    })
    expect(wrapper.find('a').exists()).toBe(true)
  })

  // ... 更多测试
})
```

---

## Button 组件示例

### React 版本关键点

```typescript
// 1. 使用 React.FC 类型
const Button: React.FC<ButtonProps> = ({ ... }) => { ... }

// 2. 使用 useState 管理状态
const [isPressed, setIsPressed] = useState(false)

// 3. 使用条件渲染
if (href) {
  return <a>...</a>
}
return <button>...</button>

// 4. 使用 className 组合
const elementClasses = [
  styles.button,
  disabled ? styles.disabled : '',
  isPressed ? styles.pressed : '',
  styles[type],
  className,
  sizeClass
].filter(Boolean).join(' ')
```

### Vue 3 版本关键点

```vue
<!-- 1. 使用 <component :is> 动态组件 -->
<component
  :is="href ? 'a' : 'button'"
  :class="buttonClasses"
>

<!-- 2. 使用 ref 管理状态 -->
const isPressed = ref(false)

<!-- 3. 使用 computed 计算类名 -->
const buttonClasses = computed(() => {
  return [
    styles.button,
    props.disabled ? styles.disabled : '',
    isPressed.value ? styles.pressed : '',
    styles[props.type || 'default'],
    props.class,
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ')
})

<!-- 4. 使用 defineProps 和 defineEmits -->
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
```

---

## 最佳实践

### 1. 样式共享

```scss
// 使用相同的 SCSS 文件
@use "sass:color";
@use "../../styles/theme.scss" as theme;

// 定义 mixin
@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;
  
  &:hover {
    background-color: color.adjust($bg-color, $lightness: -10%);
  }
}

// 在 React 和 Vue 中都使用相同的类名
.button {
  @include button-variant(theme.$global-primary-color, theme.$global-primary-text);
}
```

### 2. 类型共享

```typescript
// Button.ts - 共享类型定义
export interface ButtonProps {
  type?: 'primary' | 'default' | 'success' | 'danger' | 'warning' | 'text' | 'link'
  disabled?: boolean
  size?: 'default' | 'mini' | 'small' | 'medium' | 'large'
  loading?: boolean
  spin?: boolean
  href?: string
  target?: string
  class?: string | string[] | Record<string, boolean>
  style?: Record<string, any>
}

// React 中使用
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  // ... 扩展共享类型
}

// Vue 3 中使用
const props = withDefaults(defineProps<ButtonProps>(), {
  // ... 默认值
})
```

### 3. 逻辑共享

```typescript
// 提取通用的类名组合逻辑
export function getButtonClasses(
  props: ButtonProps,
  styles: Record<string, string>,
  isPressed: boolean = false
): string {
  const sizeClass = props.size !== 'default' ? styles[props.size] : ''
  
  return [
    styles.button,
    props.disabled ? styles.disabled : '',
    isPressed ? styles.pressed : '',
    styles[props.type || 'default'],
    props.class,
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ')
}

// React 中使用
const elementClasses = getButtonClasses(props, styles, isPressed)

// Vue 3 中使用
const buttonClasses = computed(() => 
  getButtonClasses(props, styles, isPressed.value)
)
```

### 4. 事件处理

```typescript
// React
const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
  if (disabled) return
  setIsPressed(true)
}

// Vue 3
const handleMouseDown = () => {
  if (props.disabled) return
  isPressed.value = true
}
```

### 5. 条件渲染

```typescript
// React
if (href) {
  return <a>...</a>
}
return <button>...</button>

// Vue 3
<component
  :is="href ? 'a' : 'button'"
  :href="href"
  :disabled="!href && disabled"
>
```

---

## 常见问题

### Q1: 如何处理 CSS Modules？

```typescript
// 两个框架都使用相同的方式
import styles from './index.module.scss'

// React
className={styles.button}

// Vue 3
:class="styles.button"
```

### Q2: 如何处理插槽/children？

```typescript
// React
{children || 'Button'}

// Vue 3
<slot>Button</slot>
```

### Q3: 如何处理事件？

```typescript
// React
onClick={onClick}
onMouseDown={handleMouseDown}

// Vue 3
@click="$emit('click', $event)"
@mousedown="handleMouseDown"
```

### Q4: 如何处理 Props 默认值？

```typescript
// React
const Button: React.FC<ButtonProps> = ({
  type = 'default',
  disabled = false,
  size = 'default',
  loading = false,
  spin = false,
  ...rest
}) => { ... }

// Vue 3
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  disabled: false,
  size: 'default',
  loading: false,
  spin: false,
})
```

### Q5: 如何处理动态组件？

```typescript
// React
if (href) {
  return <a>...</a>
}
return <button>...</button>

// Vue 3
<component
  :is="href ? 'a' : 'button'"
  :href="href"
  :disabled="!href && disabled"
>
```

---

## 开发清单

### 创建新组件时

- [ ] 分析 React 组件的 props、state、events
- [ ] 提取共享类型到 `Component.ts`
- [ ] 创建 `Component.vue` 文件
- [ ] 使用相同的 SCSS 样式
- [ ] 编写 `Component.test.vue` 测试
- [ ] 更新 `packages/ui/src/index.ts` 导出
- [ ] 在 Storybook 中添加 Vue 3 stories
- [ ] 更新文档

### 测试清单

- [ ] 单元测试覆盖率 > 80%
- [ ] 测试 props 的各种组合
- [ ] 测试事件触发
- [ ] 测试禁用状态
- [ ] 测试加载状态
- [ ] 测试响应式行为

---

## 下一步

1. **创建 Input 组件** - 基于 Button 的经验
2. **创建 Select 组件** - 更复杂的交互
3. **创建 Form 组件** - 复杂的表单逻辑
4. **创建 Table 组件** - 虚拟滚动实现

---

## 参考资源

- [Vue 3 官方文档](https://vuejs.org)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vue Test Utils](https://test-utils.vuejs.org)
- [Vitest](https://vitest.dev)
