# Icon 标签

组件库基础标签组件

## 导入
```ts
import { Icon } from '@ui-demo/ui';
```

## 代码演示
```tsx
<Icon name="home" />
```

## 图标预览

<script setup>
  import { Icon } from '@ui-demo/ui';
  const ReactIcon = Icon;
  const iconNames = [
    'birdhouse', 'car', 'check', 'circle', 'circleDot', 'circleX', 'download',
    'filePenLine', 'fileText', 'info', 'loadingCircle', 'loading', 'save',
    'search', 'smilePlus', 'squareCheck', 'squareDashed', 'squareX', 'square',
    'star', 'trash2', 'upload', 'userMinus', 'users', 'volume2', 'volumeX'
  ];
</script>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
  <div v-for="name in iconNames" :key="name" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{ name }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">{{ name }}</span>
  </div>
</div>

## 颜色

<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'birdhouse',
        color: '#e522ff'
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">birdhouse</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'loading',
        color: '#22ffedff',
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">loading</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'squareCheck',
        color: '#47ff22ff',
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">squareCheck</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'filePenLine',
        color: '#ff2229ff',
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">filePenLine</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'download',
        color: '#2247ffff',
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">download</span>
  </div>
</div>

## 尺寸

<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'download',
        size: 'small'
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">download - small</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'download',
        size: 'medium'
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">download - medium</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 16px; border: 1px solid #f0f0f0; border-radius: 4px;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'download',
        size: 'large'
      }"
    />
    <span style="font-size: 12px; margin-top: 8px; color: #555;">download - large</span>
  </div>
</div>

## API
| 属性 | 描述 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| name | 图标名称 | string | - | 1.0.0 |
| size | 图标大小 | string | `'small'、'medium'、'large'` | 1.0.0 |
| className | 图标类名 | string | - | 1.0.0 |
| variant | 图标样式 | string | `'default'、 'primary'、 'inset'` | 1.0.0 |
| spin | 是否旋转 | boolean | `false` | 1.0.0 |
