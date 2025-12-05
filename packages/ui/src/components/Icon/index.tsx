// packages/ui/src/components/Icon/index.tsx

import React from 'react';
import styles from './index.module.scss';

// 导入所有生成的图标
import Birdhouse from './generated/Birdhouse';
import Home from './generated/Home';
// ... 导入其他图标 ...

// 映射图标名称到组件
const iconMap = {
  birdhouse: Birdhouse,
  home: Home,
  // ...
};

export type IconName = keyof typeof iconMap;
export type IconSize = 'small' | 'medium' | 'large';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  className?: string;
  // 拟物化相关属性
  variant?: 'default' | 'primary' | 'inset'; 
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'medium', 
  className, 
  variant = 'default',
  ...rest 
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }
  
  // 动态构建类名以应用拟物化样式
  const classes = [
    styles.base,
    styles[size],
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return <IconComponent className={classes} {...rest} />;
};