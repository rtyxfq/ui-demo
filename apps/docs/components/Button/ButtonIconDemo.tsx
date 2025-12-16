// apps/docs/components/ButtonIconDemo.tsx
import React from 'react';
// 确保从你的组件库导入 Button 和 Icon
import { Button, Icon } from '@ui-demo/ui'; 

export const ButtonIconDemo = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* 演示 1: 带图标和文字 */}
      <Button type="primary" onClick={() => alert('Download')} style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <Icon name="download" size="medium" style={{ marginRight: '8px', color: '#fff' }} />
        下载
      </Button>

      {/* 演示 2: 纯图标按钮 */}
      <Button type="default">
        <Icon name="birdhouse" size="medium" style={{ color: '#fff'}} />
      </Button>
    </div>
  );
};