// apps/docs/.vitepress/theme/index.js

import DefaultTheme from 'vitepress/theme'
import * as WujieReact from 'wujie-react'
import ReactWrapper from './components/ReactWrapper.vue'
import VueWrapper from './components/VueWrapper.vue'
import FrameworkTabs from './components/FrameworkTabs.vue'
import WujieContainer from './components/WujieContainer.vue'

// 从 WujieReact 中解构出 setupApp，并重命名为 wujieSetupApp
const { setupApp: wujieSetupApp } = WujieReact.default || WujieReact

console.log('最终获取的 wujieSetupApp:', wujieSetupApp)

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 使用重命名后的 wujieSetupApp
    if (typeof wujieSetupApp === 'function') {
      wujieSetupApp({
        // 你可以在这里进行一些全局预设
      })
      console.log('✅ Wujie 初始化成功！')
    } else {
      console.error('❌ Wujie 初始化失败，wujieSetupApp 不是一个函数:', wujieSetupApp)
    }

    // 注册自定义组件
    app.component('ReactWrapper', ReactWrapper)
    app.component('VueWrapper', VueWrapper)
    app.component('FrameworkTabs', FrameworkTabs)
    app.component('WujieContainer', WujieContainer)
  }
}
