/**
 * Skeleton 组件的共享类型定义
 * 这个文件被 React 和 Vue 3 版本共同使用
 */

export interface SkeletonProps {
  /**
   * 宽度
   * @default '100%'
   */
  width?: string | number

  /**
   * 高度
   * @default 16
   */
  height?: string | number

  /**
   * 圆角
   * @default 4
   */
  borderRadius?: string | number

  /**
   * 动画类型
   * @default 'shimmer'
   */
  animation?: 'shimmer' | 'pulse' | 'gradient' | 'none'

  /**
   * 基础颜色
   * @default '#e5e7eb'
   */
  baseColor?: string

  /**
   * 高亮颜色
   * @default '#f3f4f6'
   */
  highlightColor?: string

  /**
   * 数量（用于生成多个骨架屏）
   * @default 1
   */
  count?: number

  /**
   * 间距（用于多个骨架屏之间）
   * @default 8
   */
  gap?: string | number

  /**
   * 自定义 CSS 类名
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 自定义样式
   */
  style?: Record<string, any>
}

export interface SkeletonGroupProps {
  /**
   * 布局方向
   * @default 'column'
   */
  direction?: 'row' | 'column'

  /**
   * 间距
   * @default 8
   */
  gap?: string | number

  /**
   * 自定义 CSS 类名
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 自定义样式
   */
  style?: Record<string, any>
}

/**
 * 获取骨架屏的样式对象
 */
export function getSkeletonStyle(props: SkeletonProps): Record<string, any> {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height
  const borderRadius =
    typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius

  return {
    width,
    height,
    borderRadius,
    '--skeleton-base-color': props.baseColor || '#e5e7eb',
    '--skeleton-highlight-color': props.highlightColor || '#f3f4f6',
  } as Record<string, any>
}

/**
 * 获取骨架屏的类名
 */
export function getSkeletonClasses(
  baseClass: string,
  animation?: string,
  customClass?: string | string[] | Record<string, boolean>
): string {
  const classes = [baseClass]

  if (animation && animation !== 'none') {
    classes.push(animation)
  }

  if (customClass) {
    if (typeof customClass === 'string') {
      classes.push(customClass)
    } else if (Array.isArray(customClass)) {
      classes.push(...customClass.filter(Boolean))
    } else if (typeof customClass === 'object') {
      Object.entries(customClass).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  }

  return classes.filter(Boolean).join(' ')
}

/**
 * 获取骨架屏组的样式对象
 */
export function getSkeletonGroupStyle(props: SkeletonGroupProps): Record<string, any> {
  const gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap

  return {
    gap,
  } as Record<string, any>
}

/**
 * 获取骨架屏组的类名
 */
export function getSkeletonGroupClasses(
  baseClass: string,
  direction?: string,
  customClass?: string | string[] | Record<string, boolean>
): string {
  const classes = [baseClass]

  if (direction) {
    classes.push(direction)
  }

  if (customClass) {
    if (typeof customClass === 'string') {
      classes.push(customClass)
    } else if (Array.isArray(customClass)) {
      classes.push(...customClass.filter(Boolean))
    } else if (typeof customClass === 'object') {
      Object.entries(customClass).forEach(([key, value]) => {
        if (value) classes.push(key)
      })
    }
  }

  return classes.filter(Boolean).join(' ')
}
