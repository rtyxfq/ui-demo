import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App.tsx';

// 为 window 添加 Wujie 的生命周期类型定义
declare global {
  interface Window {
    __WUJIE: boolean;
    __WUJIE_MOUNT: () => void;
    __WUJIE_UNMOUNT: () => void;
    $wujie?: {
      id?: string; // 【新增】子应用的唯一 id
      props?: Record<string, unknown>;
      bus?: {
        $on?: (event: string, cb: (data: unknown) => void) => void;
        $off?: (event: string, cb: (data: unknown) => void) => void;
        $emit?: (event: string, data?: unknown) => void;
      };
    };
  }
}

let root: Root | null = null;

// 检查是否在 Wujie 环境下
if (window.__WUJIE) {
  console.log("✅ React 子应用识别到 Wujie 环境");
  console.log("window.$wujie 对象:", window.$wujie);
  console.log("window.$wujie.props:", window.$wujie?.props);

  // 在 Wujie 环境下，暴露 mount 和 unmount 方法
  window.__WUJIE_MOUNT = () => {
    console.log("▶️ Wujie 调用 mount");
    console.log("此时 window.$wujie.props:", window.$wujie?.props);
    
    const container = document.getElementById('root');
    if (!container) return;

    const initialProps = window.$wujie?.props || { theme: 'light' };
    console.log("子应用接收到初始 Props:", initialProps);

    root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App {...initialProps} />
      </React.StrictMode>
    );

    // 【关键修改】不需要手动发送 'load' 事件，Wujie 会自动处理
    // Wujie 会在子应用的 __WUJIE_MOUNT 完成后自动发送 'load' 事件
    console.log(`✅ 子应用已完成挂载，Wujie 将自动发送 'load' 事件`);
  };

  window.__WUJIE_UNMOUNT = () => {
    console.log("⏹️ Wujie 调用 unmount");
    if (root) {
      root.unmount();
      root = null;
    }
  };

} else {
  // 不在 Wujie 环境下，作为独立应用运行
  console.log('React 应用在独立模式下运行');
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App theme="light" />
      </React.StrictMode>
    );
  }
}
