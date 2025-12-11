// apps/playground/src/main.tsx

import { StrictMode, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App.tsx';

// ======================= Wujie 微前端逻辑 =======================

let currentTheme = 'light';
let root: Root | null = null; // 用于存储 React 根实例

const renderApp = (theme: string) => {
  // 如果 root 已经存在，只更新它，避免重复创建
  if (root) {
      root.render(
          <StrictMode>
              <App theme={theme} />
          </StrictMode>
      );
  } else {
      // 首次渲染
      const container = document.getElementById('root');
      if (!container) return;
      
      root = createRoot(container);
      root.render(
          <StrictMode>
              <App theme={theme} />
          </StrictMode>
      );
  }
};


if (window.__POWERED_BY_WUJIE__) {
    // ⭐ 关键修正：确保 window.wujie 对象本身已存在
    if (window.wujie) { 
        
        // 1. 获取初始 Props (现在访问 window.wujie.props 是安全的)
        if (window.wujie.props) {
            currentTheme = window.wujie.props.theme || 'light';
            console.log('React 应用接收到初始主题:', currentTheme);
        }
        
        // 2. 监听实时变化 (使用 window.wujie.bus)
        window.wujie.bus.on('props-change', (newProps) => {
            if (newProps.theme && newProps.theme !== currentTheme) {
                currentTheme = newProps.theme;
                console.log('React 应用接收到 Props 变化:', currentTheme);
                renderApp(currentTheme);
            }
        });

        // 3. (可选) 验证微应用 -> 基座通信
        if (window.wujie.props?.onMicroAppReady) {
            window.wujie.props.onMicroAppReady();
        }
    }
    
    // 4. 首次渲染 (不论是否拿到 props，先用默认主题渲染)
    renderApp(currentTheme);

} else {
    // 如果不是在 Wujie 中，按正常模式启动
    console.log('React 应用在独立模式下运行');
    renderApp(currentTheme);
}