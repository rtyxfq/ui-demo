# Skeleton 骨架屏

骨架屏是一种加载状态的占位符，用于在异步数据加载时提升用户体验。

## 导入

### React
```ts
import { Skeleton, SkeletonGroup } from '@ui-demo/ui'
```

### Vue 3
```ts
import { VueSkeleton, VueSkeletonGroup } from '@ui-demo/ui'
```

## 基础用法

<script setup>
import { Skeleton, SkeletonGroup, VueSkeleton, VueSkeletonGroup } from '@ui-demo/ui'
</script>

### 简单骨架屏

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 200, height: 20 }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 200, height: 20 }"
/>

### 圆形骨架屏（头像）

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 40, height: 40, borderRadius: '50%' }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 40, height: 40, borderRadius: '50%' }"
/>

## 动画类型

### Shimmer（闪烁）

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 300, height: 20, animation: 'shimmer' }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 300, height: 20, animation: 'shimmer' }"
/>

### Pulse（脉冲）

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 300, height: 20, animation: 'pulse' }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 300, height: 20, animation: 'pulse' }"
/>

### Gradient（渐变）

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 300, height: 20, animation: 'gradient' }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 300, height: 20, animation: 'gradient' }"
/>

### 无动画

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: 300, height: 20, animation: 'none' }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: 300, height: 20, animation: 'none' }"
/>

## 列表骨架屏

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ width: '100%', height: 60, count: 3, gap: 12 }"
  :vue-component="VueSkeleton"
  :vue-props="{ width: '100%', height: 60, count: 3, gap: 12 }"
/>

## 组合骨架屏

### React 示例

```tsx
<SkeletonGroup>
  <Skeleton width={40} height={40} borderRadius="50%" />
  <div style={{ flex: 1 }}>
    <Skeleton width="100%" height={20} />
    <Skeleton width="80%" height={16} style={{ marginTop: 8 }} />
  </div>
</SkeletonGroup>
```

### Vue 3 示例

```vue
<VueSkeletonGroup>
  <VueSkeleton width="40" height="40" border-radius="50%" />
  <div style="flex: 1">
    <VueSkeleton width="100%" height="20" />
    <VueSkeleton width="80%" height="16" style="margin-top: 8px" />
  </div>
</VueSkeletonGroup>
```

## 自定义颜色

<FrameworkTabs
  :react-component="Skeleton"
  :react-props="{ 
    width: 300, 
    height: 20, 
    baseColor: '#f0f0f0',
    highlightColor: '#6ff680'
  }"
  :vue-component="VueSkeleton"
  :vue-props="{ 
    width: 300, 
    height: 20, 
    baseColor: '#f0f0f0',
    highlightColor: '#6ff680'
  }"
/>

## API

### Skeleton Props

| 属性 | 描述 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| width | 宽度 | `string \| number` | `'100%'` |
| height | 高度 | `string \| number` | `16` |
| borderRadius | 圆角 | `string \| number` | `4` |
| animation | 动画类型 | `'shimmer' \| 'pulse' \| 'gradient' \| 'none'` | `'shimmer'` |
| baseColor | 基础颜色 | `string` | `'#e5e7eb'` |
| highlightColor | 高亮颜色 | `string` | `'#f3f4f6'` |
| count | 数量 | `number` | `1` |
| gap | 间距 | `string \| number` | `8` |
| class | 自定义类名 | `string` | `-` |
| style | 自定义样式 | `Record<string, any>` | `-` |

### SkeletonGroup Props

| 属性 | 描述 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| direction | 布局方向 | `'row' \| 'column'` | `'column'` |
| gap | 间距 | `string \| number` | `8` |
| class | 自定义类名 | `string` | `-` |
| style | 自定义样式 | `Record<string, any>` | `-` |

## 使用场景

### 加载列表

```tsx
// React
{isLoading ? (
  <Skeleton count={5} height={60} gap={12} />
) : (
  <List data={data} />
)}

// Vue 3
<VueSkeleton v-if="isLoading" :count="5" height="60" gap="12" />
<List v-else :data="data" />
```

### 加载卡片

```tsx
// React
{isLoading ? (
  <SkeletonGroup>
    <Skeleton width={80} height={80} borderRadius="50%" />
    <div>
      <Skeleton width={200} height={20} />
      <Skeleton width={300} height={16} style={{ marginTop: 8 }} />
    </div>
  </SkeletonGroup>
) : (
  <Card data={data} />
)}

// Vue 3
<VueSkeletonGroup v-if="isLoading">
  <VueSkeleton width="80" height="80" border-radius="50%" />
  <div>
    <VueSkeleton width="200" height="20" />
    <VueSkeleton width="300" height="16" style="margin-top: 8px" />
  </div>
</VueSkeletonGroup>
<Card v-else :data="data" />
```
