- 架构参考：Ant Design (v5) 的源码
- Node 版本：v22.20.0
  - 它包含了最新的 V8 引擎，对现代 JavaScript 语法（如 ES Modules、Promise API 等）有最好的支持，并且享受官方的长期维护和安全补丁。
- Monorepo（单体仓库）
  - 是一个“架构思想”或“管理策略”，而不是一个具体的软件或库。
  - 工具： pnpm、Turborepo、Lerna、Nx。
  - 配置： pnpm-workspace.yaml、turbo.json、lerna.json。
  - "private": true避免将包发布到npm

1. 基础设施搭建，搞定“骨架” (工程化架构)
2. 搞定“皮肤” (样式系统)
3. 搞定“原子” (基础组件)
4. 搞定“交互” (复杂组件)

├── packages/ - 组件库
│ ├── ui/ - 组件库代码
│ └── test/ - 组件库测试代码
├── playground/ - 组件库演示
├── package.json - 组件库配置
├── pnpm-workspace.yaml - pnpm 工作区配置
├── QA.md - 问题沉淀
├── README.md - 组件库文档
└── TerminalCommands.md - 终端命令
