<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // 接受 Vue 组件
  component: {
    type: Object,
    required: true
  },
  // 接受传递给 Vue 组件的所有属性
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

// 计算组件的 props
const computedProps = computed(() => props.componentProps)
</script>

<template>
  <div class="vue-wrapper-container">
    <component :is="component" v-bind="computedProps" />
  </div>
</template>

<style scoped>
.vue-wrapper-container {
  display: inline-block;
}
</style>
