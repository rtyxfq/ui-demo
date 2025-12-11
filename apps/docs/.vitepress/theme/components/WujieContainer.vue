<script setup lang="ts">
import { defineProps } from 'vue'
import React from 'react'
import WujieReact from 'wujie-react'
import ReactWrapper from './ReactWrapper.vue'

const props = defineProps<{
  name: string
  url: string
  width?: string
  height?: string
}>()

// 封一个高阶组件，把 props 预注入
function WujieComponent(injectedProps: any) {
  // 最终渲染的只是一个 React 组件
  return React.createElement(WujieReact, {
    name: props.name,
    url: props.url,
    sync: true,
    alive: true,
    props: { from: 'docs-vitepress' },
    width: props.width ?? '100%',
    height: props.height ?? '800px',
    ...injectedProps,
  })
}
</script>

<template>
  <ReactWrapper :component="WujieComponent" :key="props.name" />
</template>