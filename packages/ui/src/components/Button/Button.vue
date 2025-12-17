<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="buttonClasses"
    :href="href"
    :target="target"
    :disabled="!href && disabled"
    :aria-disabled="disabled"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUpOrLeave"
    @mouseleave="handleMouseUpOrLeave"
    @click="$emit('click', $event)"
  >
    <Icon
      v-if="loading"
      name="loading"
      :spin="spin"
      style="margin-right: 4px; color: #fff"
    />
    <slot>Button</slot>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '../Icon'
import type { ButtonProps } from './Button'
import styles from './index.module.scss'

// 定义 props
const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  disabled: false,
  size: 'default',
  loading: false,
  spin: false,
})

// 定义 emits
defineEmits<{
  click: [event: MouseEvent]
}>()

// 状态管理
const isPressed = ref(false)

// 事件处理
const handleMouseDown = () => {
  if (props.disabled) return
  isPressed.value = true
}

const handleMouseUpOrLeave = () => {
  if (props.disabled) return
  isPressed.value = false
}

// 计算类名
const buttonClasses = computed(() => {
  const sizeClass = props.size !== 'default' ? styles[props.size] : ''
  
  return [
    styles.button,
    props.disabled ? styles.disabled : '',
    isPressed.value ? styles.pressed : '',
    styles[props.type],
    props.class,
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ')
})
</script>

<style module="styles" lang="scss">
@use "sass:color";
@use "../../styles/theme.scss" as theme;

$primary-color: theme.$global-primary-color;
$border-radius: theme.$global-spacing-unit;

@mixin button-variant($bg-color, $text-color) {
  background-color: $bg-color;
  color: $text-color;

  &:hover {
    background-color: color.adjust($bg-color, $lightness: -10%);
    color: $text-color;
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $primary-color;
  color: theme.$global-primary-text;
  padding: theme.$global-spacing-unit * 1 theme.$global-spacing-unit * 2;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  box-shadow:
    9px 9px 16px theme.$global-dark-shadow,
    -9px -9px 16px theme.$global-light-source;
  transition: all 0.2s ease;
  font-weight: 400;
  font-size: theme.$global-font-size;

  &:hover {
    background-color: color.adjust($primary-color, $lightness: -10%);
  }

  &:active,
  &.pressed {
    box-shadow:
      inset 5px 5px 10px theme.$global-dark-shadow,
      inset -5px -5px 10px theme.$global-light-source;
  }
}

.disabled {
  @include theme.global-disabled-style;

  &:active,
  &.pressed {
    box-shadow:
      9px 9px 16px theme.$global-dark-shadow,
      -9px -9px 16px theme.$global-light-source;
  }
}

// type 相关
.default {
  @include button-variant(theme.$global-primary-color, theme.$global-primary-text);
}

.primary {
  @include button-variant(theme.$global-primary-color, theme.$global-primary-text);
}

.success {
  @include button-variant(theme.$global-success-color, theme.$global-primary-text);
}

.danger {
  @include button-variant(theme.$global-danger-color, theme.$global-primary-text);
}

.warning {
  @include button-variant(theme.$global-warning-color, theme.$global-primary-text);
}

.text {
  background-color: transparent;
  color: theme.$global-primary-color;
  box-shadow: none;

  &:hover {
    background-color: color.adjust(theme.$global-primary-color, $alpha: -0.9);
    color: theme.$global-primary-color;
  }

  &.pressed {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  }
}

.link {
  text-decoration: none;
  display: inline-flex;
  font-weight: theme.$global-font-weight;
  font-size: theme.$global-font-size;
  @include button-variant(theme.$global-primary-color, theme.$global-primary-text);
}

// 尺寸相关
.mini {
  padding: theme.$global-spacing-unit * 0.25 theme.$global-spacing-unit * 1;
  font-size: theme.$global-font-size * 0.85;
}

.small {
  padding: theme.$global-spacing-unit * 0.5 theme.$global-spacing-unit * 1.5;
  font-size: theme.$global-font-size * 0.9;
}

.medium {
  padding: theme.$global-spacing-unit * 1 theme.$global-spacing-unit * 2;
  font-size: theme.$global-font-size;
}

.large {
  padding: theme.$global-spacing-unit * 1.5 theme.$global-spacing-unit * 3;
  font-size: theme.$global-font-size * 1.1;
}
</style>
