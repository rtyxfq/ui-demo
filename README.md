
- Node 版本：【22.20.0运行】 & 【18.14.2安装依赖包‼️】
  - 它包含了最新的 V8 引擎，对现代 JavaScript 语法（如 ES Modules、Promise API 等）有最好的支持，并且享受官方的长期维护和安全补丁。
- Monorepo（单体仓库）
  - 是一个“架构思想”或“管理策略”，而不是一个具体的软件或库。
  - 工具： pnpm、Turborepo、Lerna、Nx。
  - 配置： pnpm-workspace.yaml、turbo.json、lerna.json。
  - "private": true避免将包发布到npm

<!-- 具体细节详见[standards/QA.md] -->
1. 基础设施搭建，搞定“骨架” (工程化架构)
2. 工程化
3. 搞定“皮肤” (样式系统)
4. 风格（拟物化）
5. 搞定“原子” (基础组件)
6. 搞定“交互” (复杂组件)

- 项目启动相关命令【22.20.0运行】 & 【18.14.2安装依赖包‼️】
  - 初始化：
    - 根目录：pnpm install
    - 组件库：cd packages/ui && pnpm install
    - 文档：cd apps/docs && pnpm install
  - 打包：
    -  组件库：cd packages/ui && pnpm build
  - 启动访问：
    - 演示：cd apps/playground && pnpm dev
    - 文档预览：cd apps/docs && pnpm docs:dev

```text
├── apps/ - 可运行/可部署的消费者 (Consumer Applications)。目录容纳了所有需要被编译、部署或作为独立环境运行的 应用程序。它们是组件库的消费者，而不是生产者。
│ ├── docs/ - 组件库组件预览文档
│ └── playground/ - 组件库演示【专注于生成可部署的、面向终端用户的应用产物。永远只对 最终用户 负责‼️】
├── docs/ - 组件库文档
├── memo/ - 备忘录
│ ├── Branch.md - 分支管理
│ ├── GitCommitEmoji.md - Git提交Emoji
│ ├── QA.md - 问题沉淀
│ └── TerminalCommands.md - 终端命令
├── packages/ - 组件库
│ ├── ui/ - 组件库代码【专注于生成可复用的、干净的库产物。永远只对 开发者 负责‼️】
│ └── test/ - 组件库测试代码
├── package.json - 组件库配置
├── pnpm-lock.yaml - pnpm 锁文件
├── pnpm-workspace.yaml - pnpm 工作区配置
├── README.md - 组件库文档
└── svgr.config.js - SVGR 配置优化
