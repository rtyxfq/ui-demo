// apps/docs/.vitepress/config.js
import { resolve } from 'path'

export default {
  title: 'UI Component Library', // 组件库名称
  description: 'Powered by VitePress and React',

  // ⭐ 这里加上 vite 配置
  vite: {
    resolve: {
      alias: {
        // 把 @ui-demo/ui 指到你真实的 React 源码上

        // 绝对路径有效✅
        // '@ui-demo/ui': '/Users/ymc/Study/React/ui-demo/packages/ui/src/Button.tsx',
        '@ui-demo/ui': '/Users/ymc/Study/React/ui-demo/packages/ui/src/index.ts',
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      fs: {
        allow: [
          // 允许访问 monorepo 根目录
          resolve(__dirname, '../..'),
          // 更精确：允许访问组件库所在目录
          resolve(__dirname, '../../packages/ui'),
        ],
      },
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
    // 如果你后面需要用到 @vitejs/plugin-react，可以在这里加：
    // plugins: [react()],
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' }
        ]
      }
    ]
  }
}