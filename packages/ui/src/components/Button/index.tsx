import React, { useState, MouseEvent } from 'react';
import styles from './index.module.scss'; // 导入样式模块

// 定义 Button 组件的 props 类型
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'default' | 'success'|'danger' | 'warning' | 'text' | 'link';
  children?: React.ReactNode;
  disabled?: boolean;
  href?: string;
  target?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'default',
  children,
  onClick,
  disabled = false,
  className,
  href,
  target,
  ...rest
}) => {
  // 1. 追踪按钮是否被按下的状态
  const [isPressed, setIsPressed] = useState(false);
  // 2. 处理鼠标按下事件
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setIsPressed(true);
    // 如果外部传入了 onClick，这里不需要调用它，onClick 应该在 onMouseUp 时触发，
    // 但为了确保拟物化反馈，我们只处理样式。
  };

  // 3. 处理鼠标抬起或离开事件
  const handleMouseUpOrLeave = () => {
    if (disabled) return;
    setIsPressed(false);
  };
  // 根据是否禁用添加不同的类名
  const elementClasses = [
    styles.button, // 基础样式类
    disabled ? styles.disabled : '', // 禁用样式
    // 如果 isPressed 为 true，添加 .pressed 类名
    isPressed ? styles.pressed : '',
    styles[type],
    className, // 允许用户传入外部类名
  ].filter(Boolean).join(' ');

  // 3. 🚨 核心：条件渲染逻辑
  if (href) {
    // 如果存在 href，渲染为 <a> 标签
    return (
      <a
        className={elementClasses}
        href={href}
        target={target}
        // 链接不需要 disabled 属性，但需要处理 onClick，以防开发者传入
        onClick={onClick} 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        // 链接不需要 disabled 属性，但可以通过 ARIA 或 className 表达禁用状态
        aria-disabled={disabled}
        {...rest as React.AnchorHTMLAttributes<HTMLAnchorElement>} // 保证类型正确
      >
        {children || 'Button'}
      </a>
    );
  }

  return <button
    className={elementClasses}
    onClick={onClick}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUpOrLeave}
    onMouseLeave={handleMouseUpOrLeave} // 确保鼠标移出后也能释放按压状态
    disabled={disabled}
    {...rest}
  >
    {children || 'Button'}
  </button>;
};

export {
  Button
};