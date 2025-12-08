# Button 按钮

这是我们组件库的基础按钮组件。

## 导入

```ts
import { Button, Icon } from '@ui-demo/ui';
```

## React 使用示例

```tsx
<Button onClick={() => console.log('Click event fired')}>
  <Icon name="download" size="medium" style={{ marginRight: '8px' }} />
  Monorepo Docs Button
</Button>
```

## 类型

<script setup>
import { Button } from '@ui-demo/ui';
const ReactButton = Button;
const ReactLink = Button;
import { ButtonIconDemo } from './ButtonIconDemo';
</script>
<div style="display: flex; gap: 20px; flex-wrap: wrap;">

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '基础（Default）',
      type: 'default',
      onClick: () => alert('Default')
    }"
  />

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '主要（Primary）',
      type: 'primary',
      onClick: () => alert('Primary')
    }"
  />

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '成功（Success）',
      type: 'success',
      onClick: () => alert('Success')
    }"
  />

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '危险（Danger）',
      type: 'danger', onClick: () => alert('Danger')
    }"
  />

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '禁用状态（Disabled）',
      disabled: true
    }"
  />

  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '成功类型下禁用状态',
      type: 'success',
      disabled: true
    }"
  />


  <ReactWrapper
    :component="ReactButton"
    :props="{
      children: '文本类型',
      type: 'text',
    }"
  />

</div>

## 链接
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
  <ReactWrapper
    :component="ReactLink"
    :props="{
      children: '链接',
      type: 'link',
      href: 'https://ui-demo.vercel.app'
    }"
  />

  <ReactWrapper
    :component="ReactLink"
    :props="{
      children: '链接打开新窗口',
      href: 'https://ui-demo.vercel.app',
      target: '_blank',
      type: 'link'
    }"
  />
</div>

## 图标

<div style="display: flex; gap: 20px; flex-wrap: wrap;">
  <ReactWrapper
    :component="ButtonIconDemo"
    :props="{
      type: 'primary',
      onClick: () => alert('Download')
    }"
  />
</div>

## API

| 属性 | 描述 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| disabled | 按钮是否禁用 | `boolean` | `false` | 1.0.0 |
| className | 自定义样式类名 | `string` | `-` | 1.1.0 |
| children | 按钮内容 | `ReactNode` | `'Button'` | 1.1.0 |
| type | 按钮类型 | `string` | `'primary'、'default' 、 'success'、'danger' 、 'warning' 、 'text'` | 1.1.0 |