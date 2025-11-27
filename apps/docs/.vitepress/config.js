// apps/docs/.vitepress/config.js

export default {
  title: 'UI Component Library', // 组件库名称
  description: 'Powered by VitePress and React',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'Button 按钮', link: '/components/button' }
        ]
      }
    ]
  }
}