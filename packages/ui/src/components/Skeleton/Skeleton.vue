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
import styles from './Skeleton.module.scss'

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
  getSkeletonClasses(styles.skeleton, props.animation, props.class)
)
</script>

<style module="styles" lang="scss">
@use "sass:color";
@use "../../styles/theme.scss" as theme;

// 基础骨架屏样式
.skeleton {
  display: inline-block;
  background-color: var(--skeleton-base-color, #e5e7eb);
  border-radius: var(--skeleton-border-radius, 4px);
  overflow: hidden;

  // 默认动画是 shimmer
  &.shimmer {
    background: linear-gradient(
      90deg,
      var(--skeleton-base-color, #e5e7eb) 0%,
      var(--skeleton-highlight-color, #f3f4f6) 50%,
      var(--skeleton-base-color, #e5e7eb) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  // 脉冲动画
  &.pulse {
    background-color: var(--skeleton-base-color, #e5e7eb);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  // 渐变动画
  &.gradient {
    background: linear-gradient(
      90deg,
      var(--skeleton-base-color, #e5e7eb),
      var(--skeleton-highlight-color, #f3f4f6),
      var(--skeleton-base-color, #e5e7eb)
    );
    background-size: 200% 100%;
    animation: gradient 3s ease-in-out infinite;
  }

  // 无动画
  &.none {
    animation: none;
  }
}

// 动画定义
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes gradient {
  0% {
    background-position: -200% 0;
  }
  50% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
