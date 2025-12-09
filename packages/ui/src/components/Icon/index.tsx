// packages/ui/src/components/Icon/index.tsx

import React from 'react';
import styles from './index.module.scss';

// 导入所有生成的图标
import Birdhouse from './generated/Birdhouse';
import Car from './generated/Car';
import Check from './generated/Check';
import Circle from './generated/Circle';
import CircleDot from './generated/CircleDot';
import CircleX from './generated/CircleX';
import Download from './generated/Download';
import FilePenLine from './generated/FilePenLine';
import FileText from './generated/FileText';
import Info from './generated/Info';
import LoaderCircle from './generated/LoaderCircle';
import Loader from './generated/Loader';
import Save from './generated/Save';
import Search from './generated/Search';
import SmilePlus from './generated/SmilePlus';
import SquareCheck from './generated/SquareCheck';
import SquareDashed from './generated/SquareDashed';
import SquareX from './generated/SquareX';
import Square from './generated/Square';
import Star from './generated/Star';
import Trash2 from './generated/Trash2';
import Upload from './generated/Upload';
import UserMinus from './generated/UserMinus';
import Users from './generated/Users';
import Volume2 from './generated/Volume2';
import VolumeX from './generated/VolumeX';

// 映射图标名称到组件
const iconMap = {
  birdhouse: Birdhouse,
  car: Car,
  check: Check,
  circle: Circle,
  circleDot: CircleDot,
  circleX: CircleX,
  download: Download,
  filePenLine: FilePenLine,
  fileText: FileText,
  info: Info,
  loadingCircle: LoaderCircle,
  loading: Loader,
  save: Save,
  search: Search,
  smilePlus: SmilePlus,
  squareCheck: SquareCheck,
  squareDashed: SquareDashed,
  squareX: SquareX,
  square: Square,
  star: Star,
  trash2: Trash2,
  upload: Upload,
  userMinus: UserMinus,
  users: Users,
  volume2: Volume2,
  volumeX: VolumeX,
};

export type IconName = keyof typeof iconMap;
export type IconSize = 'small' | 'medium' | 'large';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  className?: string;
  // 拟物化相关属性
  variant?: 'default' | 'primary' | 'inset';
  spin?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  className,
  variant = 'default',
  spin = false,
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
    className,
    spin && styles.spin,
  ].filter(Boolean).join(' ');

  return <IconComponent className={classes} {...rest} />;
};