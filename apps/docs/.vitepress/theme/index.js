// apps/docs/.vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import ReactWrapper from './components/ReactWrapper.vue' // 导入 React 容器组件

export default {
  ...DefaultTheme,
  // 注册自定义组件，使其可以在 Markdown 中使用 <ReactWrapper> 标签
  enhanceApp({ app }) {
    app.component('ReactWrapper', ReactWrapper)
  }
}