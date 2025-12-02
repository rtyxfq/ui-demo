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

<ReactWrapper 
  :component="ReactButton" 
  :props="{ children: 'Monorepo Docs Button', onClick: () => alert('Clicked from Docs!') }"
>
</ReactWrapper>

## API

| 属性 | 描述 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| disabled | 按钮是否禁用 | `boolean` | `false` | 1.0.0 |
| className | 自定义样式类名 | `string` | `-` | 1.1.0 |
| children | 按钮内容 | `ReactNode` | `'Button'` | 1.1.0 |