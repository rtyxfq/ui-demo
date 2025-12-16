<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'
// 【关键修改】使用命名空间导入，以兼容 Vite 的模块解析
import * as WujieReactModule from 'wujie-react'
// 导入 Wujie 的 bus 对象，用于基座与微应用通信
import { bus as wujiBus } from 'wujie'

// 【关键修改】从导入的模块中获取真正的 React 组件，兼容 ESM 和 CJS 模块
const WujieReact = WujieReactModule.default || WujieReactModule;

const props = defineProps<{
  name: string
  url: string
  width?: string
  height?: string
}>()

const currentTheme = ref('light')
const microInstance = ref<any>(null)
const loadError = ref<string | null>(null)
const wujieMountPoint = ref<HTMLDivElement | null>(null)

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  console.log(`基座切换主题为: ${currentTheme.value}`)
  if (microInstance.value?.loaded) {
    // 通过 Wujie 的 bus 发送主题变化事件
    wujiBus.$emit('props-change', { theme: currentTheme.value })
    console.log('✅ 基座已发送主题变化事件')
  } else {
    console.warn('微应用实例未准备好，主题未同步！')
  }
}

const wujieProps = computed(() => ({
  // 【新增】把 name 也通过 props 传给子应用
  name: props.name,
  theme: currentTheme.value,
  onMessageFromMicro: (msg: any) => {
    console.log(`🎉 基座收到子应用消息 (通过 Props):`, msg)
    alert(`🎉 基座收到子应用消息 (通过 Props): ${JSON.stringify(msg)}`)
  },
}));

// 使用 onMounted 手动渲染 React 组件，绕过所有中间层
onMounted(() => {
  if (wujieMountPoint.value) {
    console.log('Vue 组件已挂载，准备渲染 React 组件...');
    console.log('正在使用的 WujieReact 组件是:', WujieReact);

    const root = ReactDOM.createRoot(wujieMountPoint.value);
    const wujieElement = React.createElement(WujieReact, {
      name: props.name,
      url: props.url,
      sync: true,
      alive: true,
      props: { ...wujieProps.value },
      width: props.width ?? '100%',
      height: props.height ?? '800px',
      afterMount: () => {
        console.log('✅✅✅ [手动挂载] 微应用加载完成！')
        loadError.value = null
        // 标记微应用已加载
        microInstance.value = { loaded: true }
        console.log('微应用已加载，可以进行通信')
        // 发送初始主题
        wujiBus.$emit('props-change', { theme: currentTheme.value })
        // 监听子应用发送的消息
        wujiBus.$on('micro-to-base', (msg: any) => {
          console.log(`🎉 [手动挂载] 基座收到子应用消息 (通过 Bus):`, msg)
        })
      },
      loadError: (err: Error) => {
        console.error('❌❌❌ [手动挂载] Wujie 加载子应用失败:', err)
        loadError.value = `[手动挂载] 微应用加载失败: ${err.message}`
        microInstance.value = null
      },
    });
    root.render(wujieElement);
    console.log('React.render 已调用，等待 WujieReact 回调...');
  }
});
</script>

<template>
  <div>
    <button
      @click="toggleTheme"
      :disabled="!microInstance"
      style="padding: 10px 20px; margin-bottom: 20px; cursor: pointer;"
    >
      切换基座主题 (当前: {{ currentTheme }})
    </button>
    <span v-if="!microInstance && !loadError" style="color: orange;">微应用加载中...</span>
    <span v-if="loadError" style="color: red; font-weight: bold;">{{ loadError }}</span>
    <!-- 定义一个 div 作为 React 组件的挂载点 -->
    <div ref="wujieMountPoint"></div>
  </div>
</template>
