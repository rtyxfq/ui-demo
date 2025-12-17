import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
// import vueJsx from '@vitejs/plugin-vue-jsx'

const uiEntry = resolve(__dirname, '../../../packages/ui/src/index.ts')
console.log('[vitepress alias] @ui-demo/ui ->', uiEntry)

export default defineConfig({
  title: 'UI Component Library',
  description: 'Powered by VitePress and React',

  vite: {
    resolve: {
      alias: {
        '@ui-demo/ui': resolve(uiEntry),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      fs: {
        allow: [
          resolve(__dirname, '../..'),
          resolve(__dirname, '../../packages/ui'),
        ],
      },
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
    plugins: [
      react({
        exclude: [/node_modules/],
      }),
      // vueJsx({
      //   // include: /\.(jsx|tsx)$/,
      //   // exclude: [/packages\/ui/],

      //   include: [/\.jsx$/, /\.tsx$/],
      //   exclude: [
      //     /node_modules/,
      //     /packages\/ui/,
      //     /..\/..\/packages\/ui/,
      //   ],
      // }),
    ],
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' },
      { text: '微前端演示', link: '/micro-app' } // 🚨 对应 micro-app.md 文件
    ],
    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Skeleton', link: '/components/skeleton' },
          { text: 'Wujie', link: '/components/micro-app.md' },
        ]
      }
    ]
  },
})