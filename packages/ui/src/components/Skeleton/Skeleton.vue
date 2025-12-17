<template>
  <!-- 多个骨架屏 -->
  <div
    v-if="count > 1"
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: typeof gap === 'number' ? `${gap}px` : gap,
    }"
  >
    <div
      v-for="i in count"
      :key="i"
      :class="skeletonClass"
      :style="skeletonStyle"
    />
  </div>

  <!-- 单个骨架屏 -->
  <div
    v-else
    :class="skeletonClass"
    :style="{
      ...skeletonStyle,
      display: 'inline-block',
    }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonProps } from './Skeleton'
import { getSkeletonStyle, getSkeletonClasses } from './Skeleton'
import './Skeleton.scss'

const props = withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: 16,
  borderRadius: 4,
  animation: 'shimmer',
  baseColor: '#e5e7eb',
  highlightColor: '#f3f4f6',
  count: 1,
  gap: 8,
})

// 计算样式
const skeletonStyle = computed(() => ({
  ...getSkeletonStyle({
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    baseColor: props.baseColor,
    highlightColor: props.highlightColor,
  }),
  ...(props.style || {}),
}))

// 计算类名
const skeletonClass = computed(() =>
  getSkeletonClasses('ui-skeleton', props.animation, props.class)
)
</script>

