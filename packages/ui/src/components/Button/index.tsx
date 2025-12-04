import React, { useState, MouseEvent } from 'react';
import styles from './index.module.scss'; // 导入样式模块

// 定义 Button 组件的 props 类型
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'primary' | 'default' | 'success'|'danger' | 'warning' | 'text';
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'normal',
  children,
  onClick,
  disabled = false,
  className,
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
  const buttonClasses = [
    styles.button, // 基础样式类
    disabled ? styles.disabled : '', // 禁用样式
    // 如果 isPressed 为 true，添加 .pressed 类名
    isPressed ? styles.pressed : '',
    styles[type],
    className, // 允许用户传入外部类名
  ].filter(Boolean).join(' ');

  return <button
    className={buttonClasses}
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