# 📦 Packages - 组件库和工具库

这个目录包含了所有可复用的组件库和工具库。

## 📋 目录结构

```
packages/
├── ui/ - 企业级 React + Vue 3 组件库 ⭐
│   ├── src/
│   │   ├── components/ - 组件源代码
│   │   │   ├── Button/ - Button 组件（React + Vue 3）✅
│   │   │   ├── Icon/ - Icon 组件 ✅
│   │   │   ├── Input/ - Input 组件（开发中）
│   │   │   ├── Select/ - Select 组件（待开发）
│   │   │   ├── Checkbox/ - Checkbox 组件（待开发）
│   │   │   ├── Radio/ - Radio 组件（待开发）
│   │   │   ├── Textarea/ - Textarea 组件（待开发）
│   │   │   ├── DatePicker/ - DatePicker 组件（待开发）
│   │   │   ├── TimePicker/ - TimePicker 组件（待开发）
│   │   │   ├── Upload/ - Upload 组件（待开发）
│   │   │   ├── Modal/ - Modal 组件（待开发）
│   │   │   ├── Drawer/ - Drawer 组件（待开发）
│   │   │   ├── Toast/ - Toast 组件（待开发）
│   │   │   ├── Alert/ - Alert 组件（待开发）
│   │   │   ├── Popover/ - Popover 组件（待开发）
│   │   │   ├── Tooltip/ - Tooltip 组件（待开发）
│   │   │   ├── Tabs/ - Tabs 组件（待开发）
│   │   │   ├── Breadcrumb/ - Breadcrumb 组件（待开发）
│   │   │   ├── Menu/ - Menu 组件（待开发）
│   │   │   ├── Pagination/ - Pagination 组件（待开发）
│   │   │   ├── Tree/ - Tree 组件（待开发）
│   │   │   ├── Cascader/ - Cascader 组件（待开发）
│   │   │   ├── DynamicForm/ - 动态表单组件（待开发）
│   │   │   ├── VirtualTable/ - 虚拟滚动表格（待开发）
│   │   │   └── Skeleton/ - 骨架屏组件（待开发）
│   │   ├── styles/ - 全局样式和主题
│   │   │   ├── theme.scss - 主题变量
│   │   │   ├── variables.scss - 全局变量
│   │   │   └── mixins.scss - SCSS mixins
│   │   └── index.ts - 导出入口
│   ├── package.json
│   └── README.md
│
├── hooks/ - React Hooks 库（待开发）
│   ├── src/
│   │   ├── useForm.ts - 表单 Hook
│   │   ├── useTable.ts - 表格 Hook
│   │   ├── useApi.ts - API Hook
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
├── composables/ - Vue 3 Composables 库（待开发）
│   ├── src/
│   │   ├── useForm.ts - 表单 Composable
│   │   ├── useTable.ts - 表格 Composable
│   │   ├── useApi.ts - API Composable
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
├── utils/ - 通用工具函数库（待开发）
│   ├── src/
│   │   ├── string.ts - 字符串工具
│   │   ├── array.ts - 数组工具
│   │   ├── object.ts - 对象工具
│   │   ├── date.ts - 日期工具
│   │   ├── number.ts - 数字工具
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
├── store/ - 状态管理库（待开发）
│   ├── src/
│   │   ├── auth.ts - 认证状态
│   │   ├── user.ts - 用户状态
│   │   ├── app.ts - 应用状态
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
├── ai-sdk/ - AI 集成库（待开发）
│   ├── src/
│   │   ├── llm/ - LLM 集成
│   │   ├── rag/ - RAG 系统
│   │   ├── prompt/ - 提示词工程
│   │   └── index.ts
│   ├── package.json
│   └── README.md
│
└── monitor/ - 性能监控库（待开发）
    ├── src/
    │   ├── metrics.ts - 性能指标
    │   ├── errors.ts - 错误监控
    │   ├── report.ts - 数据上报
    │   └── index.ts
    ├── package.json
    └── README.md
```

---

## 🎯 各包的用途

### ui/ - 企业级组件库 ⭐

**状态**：🔄 开发中

**特点**：
- 支持 React 19 和 Vue 3
- 共享样式和类型定义
- 完整的测试覆盖
- Storybook 文档

**包含组件**：
- 基础组件：Button、Icon、Input、Select 等
- 复杂组件：DynamicForm、VirtualTable、Skeleton 等
- 反馈组件：Modal、Toast、Alert 等
- 导航组件：Tabs、Menu、Breadcrumb 等

**使用方式**：
```typescript
// React
import { Button } from '@ui-demo/ui'

// Vue 3
import { VueButton } from '@ui-demo/ui'
```

---

### hooks/ - React Hooks 库

**状态**：⏳ 待开发

**特点**：
- 通用的 React Hooks
- 完整的 TypeScript 类型
- 详细的文档和示例

**包含 Hooks**：
- useForm - 表单管理
- useTable - 表格管理
- useApi - API 请求
- useAuth - 认证管理
- useLocalStorage - 本地存储

---

### composables/ - Vue 3 Composables 库

**状态**：⏳ 待开发

**特点**：
- 通用的 Vue 3 Composables
- 完整的 TypeScript 类型
- 详细的文档和示例

**包含 Composables**：
- useForm - 表单管理
- useTable - 表格管理
- useApi - API 请求
- useAuth - 认证管理
- useLocalStorage - 本地存储

---

### utils/ - 通用工具函数库

**状态**：⏳ 待开发

**特点**：
- 框架无关的工具函数
- 完整的 TypeScript 类型
- 详细的文档和示例

**包含工具**：
- 字符串工具：trim、capitalize、camelCase 等
- 数组工具：flatten、unique、groupBy 等
- 对象工具：merge、pick、omit 等
- 日期工具：format、parse、add 等
- 数字工具：round、format、random 等

---

### store/ - 状态管理库

**状态**：⏳ 待开发

**特点**：
- 基于 Zustand（React）和 Pinia（Vue 3）
- 框架无关的状态定义
- 完整的 TypeScript 类型

**包含状态**：
- auth - 认证状态
- user - 用户状态
- app - 应用状态

---

### ai-sdk/ - AI 集成库

**状态**：⏳ 待开发

**特点**：
- LLM 集成（OpenAI、Claude）
- RAG 系统实现
- 提示词工程工具

**包含功能**：
- LLM 集成
- RAG 系统
- 提示词管理
- 流式响应处理

---

### monitor/ - 性能监控库

**状态**：⏳ 待开发

**特点**：
- 性能指标收集
- 错误监控
- 数据上报

**包含功能**：
- Core Web Vitals 监控
- 错误捕获
- 用户行为追踪
- 数据上报

---

## 📊 开发进度

```
ui/
├─ Button ✅
├─ Icon ✅
├─ Input 🔄
├─ Select ⏳
├─ Checkbox ⏳
├─ Radio ⏳
├─ Textarea ⏳
├─ DatePicker ⏳
├─ TimePicker ⏳
├─ Upload ⏳
├─ Modal ⏳
├─ Drawer ⏳
├─ Toast ⏳
├─ Alert ⏳
├─ Popover ⏳
├─ Tooltip ⏳
├─ Tabs ⏳
├─ Breadcrumb ⏳
├─ Menu ⏳
├─ Pagination ⏳
├─ Tree ⏳
├─ Cascader ⏳
├─ DynamicForm ⏳
├─ VirtualTable ⏳
└─ Skeleton ⏳

hooks/ ⏳
composables/ ⏳
utils/ ⏳
store/ ⏳
ai-sdk/ ⏳
monitor/ ⏳
```

---

## 🚀 快速开始

### 安装依赖

```bash
# 在根目录
pnpm install

# 或在特定包目录
cd packages/ui
pnpm install
```

### 开发组件

```bash
# 进入 ui 包
cd packages/ui

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

### 使用组件

```typescript
// React
import { Button, Icon } from '@ui-demo/ui'

// Vue 3
import { VueButton, VueIcon } from '@ui-demo/ui'
```

---

## 📚 相关文档

- [UI 组件库文档](./ui/README.md)
- [项目规划](../memo/QA/QA-0001.md)
- [技术栈](../memo/QA/TechStack.md)
- [Vue 组件开发指南](../memo/QA/VueComponentDevelopmentGuide.md)

---

**最后更新**：2025-12-17
**维护者**：zzg
