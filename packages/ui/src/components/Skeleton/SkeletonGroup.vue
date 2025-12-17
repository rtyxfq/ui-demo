<template>
  <div
    :class="groupClass"
    :style="groupStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonGroupProps } from './Skeleton'
import { getSkeletonGroupStyle, getSkeletonGroupClasses } from './Skeleton'
import styles from './Skeleton.module.scss'

const props = withDefaults(defineProps<SkeletonGroupProps>(), {
  direction: 'column',
  gap: 8,
})

// 计算样式
const groupStyle = computed(() => ({
  ...getSkeletonGroupStyle({ gap: props.gap }),
  ...(props.style || {}),
}))

// 计算类名
const groupClass = computed(() =>
  getSkeletonGroupClasses(styles.skeletonGroup, props.direction, props.class)
)
</script>

<style module="styles" lang="scss">
// 骨架屏组
.skeletonGroup {
  display: flex;
  gap: var(--skeleton-gap, 8px);

  &.row {
    flex-direction: row;
  }

  &.column {
    flex-direction: column;
  }
}
</style>
