<script setup>
import { ref } from 'vue'

const props = defineProps({
  // React 组件
  reactComponent: {
    type: [Object, Function],
    required: true
  },
  // React 组件的 props
  reactProps: {
    type: Object,
    default: () => ({})
  },
  // Vue 组件
  vueComponent: {
    type: Object,
    required: true
  },
  // Vue 组件的 props
  vueProps: {
    type: Object,
    default: () => ({})
  }
})

// 当前选中的框架
const activeFramework = ref('react')

// 是否显示代码
const showCode = ref(false)
</script>

<template>
  <div class="framework-tabs">
    <!-- 标签页 -->
    <div class="tabs-header">
      <button
        :class="['tab-button', { active: activeFramework === 'react' }]"
        @click="activeFramework = 'react'"
      >
        ⚛️ React
      </button>
      <button
        :class="['tab-button', { active: activeFramework === 'vue' }]"
        @click="activeFramework = 'vue'"
      >
        💚 Vue 3
      </button>
      <button
        :class="['tab-button', 'code-button']"
        @click="showCode = !showCode"
      >
        {{ showCode ? '隐藏代码' : '显示代码' }}
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="tabs-content">
      <!-- React 版本 -->
      <div v-if="activeFramework === 'react'" class="framework-content">
        <ReactWrapper :component="reactComponent" :props="reactProps" />
      </div>

      <!-- Vue 3 版本 -->
      <div v-if="activeFramework === 'vue'" class="framework-content">
        <VueWrapper :component="vueComponent" :component-props="vueProps" />
      </div>
    </div>

    <!-- 代码展示 -->
    <div v-if="showCode" class="code-section">
      <div v-if="activeFramework === 'react'" class="code-block">
        <h4>React 代码</h4>
        <pre><code>
&lt;Button
  type="primary"
  onClick={() => console.log('clicked')}
&gt;
  Click me
&lt;/Button&gt;
        </code></pre>
      </div>

      <div v-if="activeFramework === 'vue'" class="code-block">
        <h4>Vue 3 代码</h4>
        <pre><code>
&lt;template&gt;
  &lt;VueButton
    type="primary"
    @click="handleClick"
  &gt;
    Click me
  &lt;/VueButton&gt;
&lt;/template&gt;

&lt;script setup&gt;
const handleClick = () =&gt; {
  console.log('clicked')
}
&lt;/script&gt;
        </code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.framework-tabs {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.tabs-header {
  display: flex;
  gap: 0;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 0;
}

.tab-button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
}

.tab-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.tab-button.active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background-color: #eff6ff;
}

.code-button {
  flex: 0 0 auto;
  border-left: 1px solid #e5e7eb;
  color: #6b7280;
}

.code-button:hover {
  background-color: #f3f4f6;
}

.tabs-content {
  padding: 24px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.framework-content {
  width: 100%;
}

.code-section {
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  padding: 16px;
}

.code-block {
  margin-bottom: 16px;
}

.code-block:last-child {
  margin-bottom: 0;
}

.code-block h4 {
  margin: 0 0 8px 0;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block pre {
  margin: 0;
  background-color: #1f2937;
  color: #e5e7eb;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.5;
}

.code-block code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>
