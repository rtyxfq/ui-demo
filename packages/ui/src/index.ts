// 1. 导入组件
export { Button } from './Button';
// 2. 🚨 新增：手动导入组件库的 CSS 产物。
//    这一行告诉打包工具，当有人导入这个库时，必须同时处理这个 CSS 文件。
//    （注意：这里的路径是相对于组件库源码的路径，而不是 dist 路径）
import './Button.module.scss';