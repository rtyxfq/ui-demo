<script setup lang="ts">
import {
  defineProps,
  computed,
  ref
} from 'vue'
import React from 'react'
import WujieReact from 'wujie-react'
import ReactWrapper from './ReactWrapper.vue'

const props = defineProps<{
  name: string
  url: string
  width?: string
  height?: string
}>()

// 1. 【通信关键】定义响应式状态
const currentTheme = ref('light')

// 2. 模拟主题切换的方法
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  console.log(`基座切换主题为: ${currentTheme.value}`)
}

// 3. 【通信关键】定义要传递给微应用的响应式 props 对象
const wujieProps = computed(() => ({
  theme: currentTheme.value,
  // 还可以传递一个方法，供微应用调用基座的方法
  onMicroAppReady: () => console.log('微应用已准备好并向基座报告!'),
}));

// 封一个高阶组件，把 props 预注入
function WujieComponent(injectedProps: any) {
  // 最终渲染的只是一个 React 组件
  return React.createElement(WujieReact, {
    name: props.name,
    url: props.url,
    sync: true,
    alive: true,
    // 【通信关键】将计算属性的值（.value）合并到组件的 props 中
    props: {
      from: 'docs-vitepress',
      ...wujieProps.value, // 使用 .value 获取最新值
    },
    width: props.width ?? '100%',
    height: props.height ?? '800px',
    ...injectedProps,
  })
}
</script>

<template>
  <div>
    <button @click="toggleTheme" style="padding: 10px 20px; margin-bottom: 20px; cursor: pointer; border: 1px solid #ccc; background-color: #f0f0f0;">
        切换基座主题 (当前: {{ currentTheme }})
    </button>

    <ReactWrapper :component="WujieComponent" :key="props.name" />
  </div>
</template>