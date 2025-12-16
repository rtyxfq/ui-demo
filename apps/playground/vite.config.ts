import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // 默认应该为 '/'
  server: {
    // 【关键修改】明确指定端口号为 3001
    port: 3001,
    // 确保开发服务器支持 CORS，便于基座加载
    // 这一步对于 Wujie 在开发环境加载资源是必要的
    cors: true,
  },
  build: {
    // 确保微应用打包产物路径正确
    outDir: 'dist',
  },
  plugins: [react()],
})
