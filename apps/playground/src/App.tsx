// apps/playground/src/App.tsx

import React, { useEffect, useState } from 'react';

// 为 window.$wujie 提供类型定义
declare global {
  interface Window {
    $wujie?: {
      id?: string;
      props?: Record<string, unknown>;
      bus?: {
        $on?: (event: string, cb: (data: unknown) => void) => void;
        $off?: (event: string, cb: (data: unknown) => void) => void;
        $emit?: (event: string, data?: unknown) => void;
      };
    };
  }
}

// 定义 props 接口
interface AppProps {
  theme?: string;
  name?: string;
  onMessageFromMicro?: (msg: unknown) => void;
}

// 确保 App 组件接收 theme 属性
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function App({ theme: initialTheme = 'light', name, onMessageFromMicro }: AppProps) {
  const [theme, setTheme] = useState(initialTheme);
  
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    // 监听基座通过 bus 发送的主题变化
    const handler = (data: unknown) => {
      if (typeof data === 'object' && data !== null && 'theme' in data) {
        setTheme((data as Record<string, unknown>).theme as string);
      }
    };
    window.$wujie?.bus?.$on?.('props-change', handler);
    return () => {
      window.$wujie?.bus?.$off?.('props-change', handler);
    };
  }, []);

  const style = {
    padding: '20px',
    border: `2px solid ${theme === 'dark' ? 'white' : 'black'}`,
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#333',
    transition: 'all 0.3s ease',
    fontFamily: 'sans-serif',
  };

  // --- 子应用 -> 基座 通信 ---

  /**
   * 方式1: 通过 props 回调函数发送消息
   */
  const sendMessageByProps = () => {
    const msg = { text: '你好基座，我是子应用，通过 props 回调发送消息！', timestamp: Date.now() };
    console.log('子应用: 正在通过 props 回调发送消息...', msg);
    // 安全地调用基座传递过来的函数
    const callback = window.$wujie?.props?.onMessageFromMicro;
    if (typeof callback === 'function') {
      callback(msg);
    }
  };

  /**
   * 方式2: 通过 bus 事件总线发送消息
   */
  const sendMessageByBus = () => {
    const msg = { text: '你好基座，我是子应用，通过 bus 事件发送消息！', timestamp: Date.now() };
    console.log('子应用: 正在通过 bus 发送消息...', msg);
    // 在事件总线上触发一个自定义事件，基座可以监听这个事件
    window.$wujie?.bus?.$emit?.('micro-to-base', msg);
  };

  return (
    <div style={style}>
      <h2>Playground React 微应用</h2>
      <p>
        主题状态来自基座: <strong>{theme.toUpperCase()}</strong>
      </p>

      <hr style={{ margin: '20px 0' }} />

      <h3>子应用向基座发送消息:</h3>
      <button
        onClick={sendMessageByProps}
        style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}
      >
        通过 Props 回调发送
      </button>
      <button onClick={sendMessageByBus} style={{ padding: '8px 12px', cursor: 'pointer' }}>
        通过 Bus 事件发送
      </button>
    </div>
  );
}

export default App;
