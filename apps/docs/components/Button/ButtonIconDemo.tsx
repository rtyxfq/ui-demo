// apps/docs/components/ButtonIconDemo.tsx
import React from 'react';
// 确保从你的组件库导入 Button 和 Icon
import { Button, Icon } from '@ui-demo/ui'; 

export const ButtonIconDemo = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* 演示 1: 带图标和文字 */}
      <Button type="primary" onClick={() => alert('Download')}>
        <Icon name="download" size="medium" style={{ marginRight: '8px' }} />
        下载
      </Button>

      {/* 演示 2: 纯图标按钮 */}
      <Button type="default">
        <Icon name="birdhouse" size="medium" />
      </Button>
    </div>
  );
};