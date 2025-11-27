// packages/ui/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
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
      // 关键：确保 react 和 react-dom 不会被打包进你的库里，避免包体积膨胀
      // 因为使用者（如 playground）通过 peerDependencies 已经安装了它们
      external: ['react', 'react-dom'],
      output: {
        // 在 UMD 模式下为外部依赖提供全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    // 产物输出目录
    outDir: 'dist',
    // 清空输出目录
    emptyOutDir: true,
  },
});