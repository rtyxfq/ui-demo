<script setup lang="jsx">
import { defineProps } from 'vue';
import WujieReact from 'wujie-react'; // 导入 React 组件
import ReactWrapper from './ReactWrapper.vue'; // 导入你的 Vue 封装的 React 容器

// 定义 props 来接收微应用的配置
const props = defineProps({
  name: { type: String, required: true },
  url: { type: String, required: true },
  width: { type: String, default: '100%' },
  height: { type: String, default: '800px' },
  // 更多 Wujie 的 props，如 sync, alive, props, etc.
});

// WujieReact 是在 React 环境中使用的，这里我们将其传入 ReactWrapper
const WujieComponent = (
  <WujieReact
    name={props.name}
    url={props.url}
    sync={true} // 默认开启路由同步
    alive={true} // 默认开启保活模式
    props={{ from: 'docs-vitepress' }} // 可以在这里传递初始数据
    width={props.width}
    height={props.height}
  />
);
</script>

<template>
  <ReactWrapper :component="WujieComponent" :key="props.name" />
</template>