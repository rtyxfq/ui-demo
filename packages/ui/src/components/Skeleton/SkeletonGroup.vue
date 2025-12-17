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
import './Skeleton.scss'

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
  getSkeletonGroupClasses('ui-skeleton-group', props.direction, props.class)
)
</script>
