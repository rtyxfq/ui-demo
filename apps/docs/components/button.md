# Button 按钮

这是我们组件库的基础按钮组件。

## 导入

```ts
import { Button } from '@ui-demo/ui';
```

## React 使用示例

```tsx
<Button onClick={() => console.log('Click event fired')}>
  Monorepo Docs Button
</Button>
```

## 演示

<script setup> 
import { Button } from '@ui-demo/ui'; 
const ReactButton = Button; 
</script>
<div style="display: flex; gap: 20px; flex-wrap: wrap;">

  ### 基础（Default）

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Default Button', type: 'default', onClick: () => alert('Default') }"
  />

  ### 主要（Primary）

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Primary Button', type: 'primary', onClick: () => alert('Primary') }"
  />
  
  ### 成功（Success）

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Success Button', type: 'success', onClick: () => alert('Success') }"
  />
  
  ### 危险（Danger）

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Danger Button', type: 'danger', onClick: () => alert('Danger') }"
  />

  ### 禁用状态

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Disabled Button', disabled: true }"
  />

  ### 成功类型下禁用状态

  <ReactWrapper 
    :component="ReactButton" 
    :props="{ children: 'Success & Disabled Button', type: 'success', disabled: true }"
  />

</div>
## API

| 属性 | 描述 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| disabled | 按钮是否禁用 | `boolean` | `false` | 1.0.0 |
| className | 自定义样式类名 | `string` | `-` | 1.1.0 |
| children | 按钮内容 | `ReactNode` | `'Button'` | 1.1.0 |