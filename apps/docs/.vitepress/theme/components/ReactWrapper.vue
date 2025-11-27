<script>
import React from 'react';
import ReactDOM from 'react-dom/client';

export default {
  props: {
    // 接受组件名（例如：Button）
    component: {
      type: [Object, Function],
      required: true
    },
    // 接受传递给 React 组件的所有属性
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.renderReactComponent();
  },
  updated() {
    this.renderReactComponent();
  },
  // 在组件销毁时，卸载 React 根节点以防内存泄漏
  unmounted() {
    if (this._reactRoot) {
      this._reactRoot.unmount();
    }
  },
  methods: {
    renderReactComponent() {
      if (!this.$el) return;

      // 1. 获取 React 组件
      const Component = this.component;

      // 2. 如果根节点不存在，创建 React 根节点
      if (!this._reactRoot) {
        this._reactRoot = ReactDOM.createRoot(this.$el);
      }

      // 3. 渲染 React 元素
      this._reactRoot.render(
        React.createElement(Component, this.props)
      );
    }
  },
}
</script>

<template>
  <div class="react-wrapper-container"></div>
</template>