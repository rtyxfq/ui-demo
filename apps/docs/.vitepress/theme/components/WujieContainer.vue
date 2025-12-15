<script setup lang="ts">
import { defineProps, computed, ref } from 'vue'
import React from 'react'
import WujieReact from 'wujie-react'
import ReactWrapper from './ReactWrapper.vue'

const props = defineProps<{
  name: string
  url: string
  width?: string
  height?: string
}>()

// 1. 定义响应式状态
const currentTheme = ref('light')
// 新增：用于存储微应用实例
const microInstance = ref<any>(null)

// 2. 主题切换方法
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  console.log(`基座切换主题为: ${currentTheme.value}`)
  // 【关键】使用 bus 主动通知子应用 props 变化
  microInstance.value?.bus?.$emit('props-change', { theme: currentTheme.value })
}

// 3. 定义要传递给微应用的 props 对象
const wujieProps = computed(() => ({
  theme: currentTheme.value,
  // 【关键】定义一个回调函数，用于接收子应用的消息
  onMessageFromMicro: (msg: any) => {
    console.log(`🎉 基座收到子应用消息 (通过 Props):`, msg)
    alert(`🎉 基座收到子应用消息 (通过 Props): ${JSON.stringify(msg)}`)
  },
}));

// 4. 封装 Wujie-React 组件
function WujieComponent(injectedProps: any) {
  return React.createElement(WujieReact, {
    name: props.name,
    url: props.url,
    sync: true,
    alive: true,
    props: { ...wujieProps.value },
    width: props.width ?? '100%',
    height: props.height ?? '800px',
    // 【关键】微应用加载后，获取实例并设置监听
    onLoad: () => {
      microInstance.value = (window as any).$wujie?.getInstance?.(props.name)
      // 立即同步一次当前主题，防止加载时状态不一致
      microInstance.value?.bus?.$emit('props-change', { theme: currentTheme.value })
      // 【关键】监听子应用通过 bus 发送的事件
      microInstance.value?.bus?.$on('micro-to-base', (msg: any) => {
        console.log(`🎉 基座收到子应用消息 (通过 Bus):`, msg)
        alert(`🎉 基座收到子应用消息 (通过 Bus): ${JSON.stringify(msg)}`)
      })
    },
    ...injectedProps,
  })
}
</script>

<template>
  <div>
    <button @click="toggleTheme" style="padding: 10px 20px; margin-bottom: 20px; cursor: pointer;">
        切换基座主题 (当前: {{ currentTheme }})
    </button>

    <ReactWrapper :component="WujieComponent" :key="props.name" />
  </div>
</template>
