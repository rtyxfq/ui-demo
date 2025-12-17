/**
 * Button 组件的共享类型定义
 * 这个文件被 React 和 Vue 3 版本共同使用
 */

export interface ButtonProps {
  /**
   * 按钮类型
   * @default 'default'
   */
  type?: 'primary' | 'default' | 'success' | 'danger' | 'warning' | 'text' | 'link'

  /**
   * 按钮是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 按钮大小
   * @default 'default'
   */
  size?: 'default' | 'mini' | 'small' | 'medium' | 'large'

  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean

  /**
   * 加载图标是否旋转
   * @default false
   */
  spin?: boolean

  /**
   * 链接地址（如果提供，将渲染为 <a> 标签）
   */
  href?: string

  /**
   * 链接打开方式
   */
  target?: string

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
 * 获取按钮的 CSS 类名
 * @param props - 按钮 props
 * @param styles - CSS Modules 样式对象
 * @param isPressed - 是否被按下
 * @returns 组合后的类名字符串
 */
export function getButtonClasses(
  props: ButtonProps,
  styles: Record<string, string>,
  isPressed: boolean = false
): string {
  const sizeClass = props.size !== 'default' ? styles[props.size] : ''

  return [
    styles.button,
    props.disabled ? styles.disabled : '',
    isPressed ? styles.pressed : '',
    styles[props.type || 'default'],
    props.class,
    sizeClass,
  ]
    .filter(Boolean)
    .join(' ')
}
