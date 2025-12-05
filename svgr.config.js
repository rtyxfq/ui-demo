// svgr.config.js (放在 Monorepo 根目录)

module.exports = {
  // 1. 设置 SVG 属性：确保 SVG 接收 React props
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default', // 使用默认预设，它包含了大多数优化
        params: {
          overrides: {
            // 保持 viewBox 属性（用于响应式缩放），否则尺寸难以控制
            removeViewBox: false,

            // 🚨 移除 fill 属性，让组件可以通过 CSS color 控制颜色
            removeAttrs: {
              attrs: ['fill', 'stroke-width', 'stroke'] // 移除这些属性，让它们由 CSS/Props 控制
            },

            // 🚨 [可选，但推荐] 添加前缀，解决组件 ID 冲突问题
            prefixIds: {
                prefix: 'icon'
            }
            // 🚨 移除或注释掉旧的 cleanupIDs 配置
            // { name: 'cleanupIDs', active: true } // <-- 删掉或注释这行
          },
        },
      },
      // 如果你的 SVGO 版本低于 3.x，removeAttrs 需要单独定义：
      // {
      //   name: 'removeAttrs',
      //   params: {
      //     attrs: 'fill'
      //   }
      // }
    ],
  },
  // 2. 将图标转换为 TypeScript React 组件
  typescript: true,
  // 3. 模板配置
  template: (variables, { tpl }) => {
    return tpl`
      ${variables.imports};
      ${variables.interfaces};

      const ${variables.componentName} = (${variables.props}) => (
        // 🚨 确保生成的 SVG 元素可以接收 className 和其他 props
        ${variables.jsx}
      );

      ${variables.componentName}.displayName = '${variables.componentName}';

      ${variables.exports};
    `;
  },
  // 4. 使用 prettier 格式化输出
  prettier: true,
};