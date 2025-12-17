# Button 按钮

这是我们组件库的基础按钮组件，支持 React 和 Vue 3。

## 导入

### React
```ts
import { Button, Icon } from '@ui-demo/ui'
```

### Vue 3
```ts
import { VueButton, VueIcon } from '@ui-demo/ui'
```

## 基础用法

<script setup>
import { Button, VueButton } from '@ui-demo/ui'
import { Icon } from '@ui-demo/ui'

const handleClick = () => alert('Button clicked!')
</script>

<FrameworkTabs
  :react-component="Button"
  :react-props="{
    children: '点击我',
    type: 'primary',
    onClick: handleClick
  }"
  :vue-component="VueButton"
  :vue-props="{
    type: 'primary',
    onClick: handleClick
  }"
>
  <template #default>
    点击我
  </template>
</FrameworkTabs>

## 按钮类型

### 基础类型

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Default', type: 'default' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'default' }"
  >
    <template #default>Default</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Primary', type: 'primary' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary' }"
  >
    <template #default>Primary</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Success', type: 'success' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'success' }"
  >
    <template #default>Success</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Danger', type: 'danger' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'danger' }"
  >
    <template #default>Danger</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Warning', type: 'warning' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'warning' }"
  >
    <template #default>Warning</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Text', type: 'text' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'text' }"
  >
    <template #default>Text</template>
  </FrameworkTabs>
</div>

## 按钮大小

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Mini', type: 'primary', size: 'mini' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', size: 'mini' }"
  >
    <template #default>Mini</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Small', type: 'primary', size: 'small' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', size: 'small' }"
  >
    <template #default>Small</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Default', type: 'primary' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary' }"
  >
    <template #default>Default</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Large', type: 'primary', size: 'large' }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', size: 'large' }"
  >
    <template #default>Large</template>
  </FrameworkTabs>
</div>

## 禁用状态

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Disabled', type: 'primary', disabled: true }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', disabled: true }"
  >
    <template #default>Disabled</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Disabled', type: 'default', disabled: true }"
    :vue-component="VueButton"
    :vue-props="{ type: 'default', disabled: true }"
  >
    <template #default>Disabled</template>
  </FrameworkTabs>
</div>

## 加载状态

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0;">
  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Loading', type: 'primary', loading: true }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', loading: true }"
  >
    <template #default>Loading</template>
  </FrameworkTabs>

  <FrameworkTabs
    :react-component="Button"
    :react-props="{ children: 'Loading', type: 'primary', loading: true, spin: true }"
    :vue-component="VueButton"
    :vue-props="{ type: 'primary', loading: true, spin: true }"
  >
    <template #default>Loading</template>
  </FrameworkTabs>
</div>

## API

| 属性 | 描述 | 类型 | 默认值 | 版本 |
| :--- | :--- | :--- | :--- | :--- |
| type | 按钮类型 | `'primary' \| 'default' \| 'success' \| 'danger' \| 'warning' \| 'text' \| 'link'` | `'default'` | 1.0.0 |
| size | 按钮大小 | `'mini' \| 'small' \| 'medium' \| 'large'` | `'default'` | 1.0.0 |
| disabled | 是否禁用 | `boolean` | `false` | 1.0.0 |
| loading | 是否加载中 | `boolean` | `false` | 1.0.0 |
| spin | 加载图标是否旋转 | `boolean` | `false` | 1.0.0 |
| href | 链接地址（仅 type='link' 时有效） | `string` | `-` | 1.0.0 |
| target | 链接打开方式 | `'_blank' \| '_self' \| '_parent' \| '_top'` | `-` | 1.0.0 |

## 事件

### React
| 事件 | 描述 | 回调参数 |
| :--- | :--- | :--- |
| onClick | 点击事件 | `(event: MouseEvent) => void` |

### Vue 3
| 事件 | 描述 | 回调参数 |
| :--- | :--- | :--- |
| @click | 点击事件 | `(event: MouseEvent) => void` |
