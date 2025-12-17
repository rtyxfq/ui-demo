import React, { useMemo } from 'react'
import type { SkeletonProps, SkeletonGroupProps } from './Skeleton'
import { getSkeletonStyle, getSkeletonClasses, getSkeletonGroupStyle, getSkeletonGroupClasses } from './Skeleton'
import styles from './Skeleton.module.scss'

/**
 * Skeleton 组件 - React 版本
 * 用于显示加载中的占位符
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = 16,
      borderRadius = 4,
      animation = 'shimmer',
      baseColor,
      highlightColor,
      count = 1,
      gap = 8,
      class: className,
      style,
      ...rest
    },
    ref
  ) => {
    // 计算样式
    const skeletonStyle = useMemo(
      () => ({
        ...getSkeletonStyle({
          width,
          height,
          borderRadius,
          baseColor,
          highlightColor,
        }),
        ...style,
      }),
      [width, height, borderRadius, baseColor, highlightColor, style]
    )

    // 计算类名
    const skeletonClass = useMemo(
      () => getSkeletonClasses(styles.skeleton, animation, className),
      [animation, className]
    )

    // 如果 count > 1，渲染多个骨架屏
    if (count > 1) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: typeof gap === 'number' ? `${gap}px` : gap,
          }}
        >
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? ref : undefined}
              className={skeletonClass}
              style={skeletonStyle}
              {...rest}
            />
          ))}
        </div>
      )
    }

    // 单个骨架屏
    return (
      <div
        ref={ref}
        className={skeletonClass}
        style={{
          ...skeletonStyle,
          display: 'inline-block',
        }}
        {...rest}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

/**
 * SkeletonGroup 组件 - React 版本
 * 用于组合多个骨架屏
 */
const SkeletonGroup = React.forwardRef<HTMLDivElement, SkeletonGroupProps & { children?: React.ReactNode }>(
  (
    {
      direction = 'column',
      gap = 8,
      class: className,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    // 计算样式
    const groupStyle = useMemo(
      () => ({
        ...getSkeletonGroupStyle({ gap }),
        ...style,
      }),
      [gap, style]
    )

    // 计算类名
    const groupClass = useMemo(
      () => getSkeletonGroupClasses(styles.skeletonGroup, direction, className),
      [direction, className]
    )

    return (
      <div
        ref={ref}
        className={groupClass}
        style={groupStyle}
        {...rest}
      >
        {children}
      </div>
    )
  }
)

SkeletonGroup.displayName = 'SkeletonGroup'

// 为 Skeleton 添加 Group 子组件
Skeleton.Group = SkeletonGroup

export { Skeleton, SkeletonGroup }
