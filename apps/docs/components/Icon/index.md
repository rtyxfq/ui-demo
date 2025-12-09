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
</script>
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'birdhouse',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    birdhouse
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'car',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    car
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'check',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    check
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'circle',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    circle
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'circleDot',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    circleDot
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'circleX',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    circleX
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'download',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    download
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'filePenLine',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    filePenLine
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'fileText',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    fileText
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'info',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    info
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'loadingCircle',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    loadingCircle
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'loading',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    loading
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'save',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    save
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'search',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    search
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'smilePlus',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    smilePlus
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'squareCheck',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    squareCheck
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'squareDashed',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    squareDashed
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'squareX',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    squareX
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'square',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    square
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'star',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    star
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'trash2',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    trash2
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'upload',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    upload
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'userMinus',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    userMinus
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'users',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    users
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'volume2',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    volume2
  </div>
  <div style="display: flex; flexDirection: column; alignItems: center;">
    <ReactWrapper
      :component="ReactIcon"
      :props="{
        name: 'volumeX',
        // size: 24,
        // color: '#1677ff'
      }"
    />
    volumeX
  </div>

</div>