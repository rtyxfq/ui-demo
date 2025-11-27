// apps/docs/vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  // 确保 Vite 知道如何处理 JSX 和 TSX
  plugins: [], 
  resolve: {
    // 确保 Vite 在解析依赖时，能正确地处理 Monorepo 链接
    alias: {
      '@ui-demo/ui': '../../packages/ui/src', 
      // 临时将组件库指向源码，以便 Vite 更好地解析 JSX/TSX
    }
  },
  // 如果你在 ReactWrapper 中使用了 JSX，需要配置以下内容：
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  }
});