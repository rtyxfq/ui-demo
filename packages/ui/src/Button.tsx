import styles from './Button.module.scss'; // 导入样式模块

const Button = ({
  children,
  disabled,
  className,
  ...rest
}) => {
  // 根据是否禁用添加不同的类名
  const buttonClasses = [
    styles.button, // 基础样式类
    disabled ? styles.disabled : '', // 禁用样式
    className // 允许用户传入外部类名
  ].filter(Boolean).join(' ');

  return <button
    className={buttonClasses}
    disabled={disabled}
    {...rest}
  >
    {children || 'Button'}
  </button>;
};

export {
  Button
};