// apps/docs/.vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import ReactWrapper from './components/ReactWrapper.vue' // 导入 React 容器组件
import WujieContainer from './components/WujieContainer.vue' // 🚨 导入新的 Wujie 容器

// 🚨 导入你的 React 封装组件 (如果你的 ReactWrapper 是一个 Vue 组件，需要先在 config.js 中配置)
// 假设你的 ReactWrapper 是一个可以在 Vue 中使用的组件
// import ReactWrapper from '../../components/ReactWrapper.vue';

export default {
  ...DefaultTheme,
  // 注册自定义组件，使其可以在 Markdown 中使用 <ReactWrapper> 标签
  enhanceApp({ app }) {
    app.component('ReactWrapper', ReactWrapper),
    // 2. 注册 Wujie 微前端容器组件
    app.component('WujieContainer', WujieContainer)
  }
}