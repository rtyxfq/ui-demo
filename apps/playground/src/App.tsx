// apps/playground/src/App.tsx

import React from 'react';

// 定义 props 接口
interface AppProps {
  theme: string;
}

// 确保 App 组件接收 theme 属性
function App({ theme }: AppProps) {
  const style = {
    padding: '20px',
    border: `2px solid ${theme === 'dark' ? 'white' : 'black'}`,
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    color: theme === 'dark' ? '#FFF' : '#333',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={style}>
      <h2>Playground React 微应用</h2>
      <p>主题状态来自基座: **{theme.toUpperCase()}**</p>
      {/* ... 你的其他内容 ... */}
    </div>
  );
}

export default App;