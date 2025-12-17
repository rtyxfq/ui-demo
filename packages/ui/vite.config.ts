// packages/ui/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    vue({
      // Vue 3 插件配置
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ion-'),
        },
      },
    }),
    dts({
      insertTypesEntry: true,
      // 支持 .vue 文件的类型生成
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      // 指定组件库入口
      entry: resolve(__dirname, 'src/index.ts'),
      // 暴露的全局变量名 (在 UMD 模式下)
      name: 'UiDemoUi',
      // 输出文件名格式
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保 react、react-dom 和 vue 不会被打包进库里
      // 因为使用者通过 peerDependencies 已经安装了它们
      external: ['react', 'react-dom', 'vue'],
      output: {
        // 在 UMD 模式下为外部依赖提供全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
        },
      },
    },
    // 产物输出目录
    outDir: 'dist',
    // 清空输出目录
    emptyOutDir: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})