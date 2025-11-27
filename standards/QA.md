<!-- 虽然是QA，梳理下来基本为整体的构建思路了 -->
1. 创建第一个应用环境
   - 技术栈选择：哪个工具（Vite/Next.js）作为开发环境启动速度最快？
   1.  Vite (构建工具 / Build Tool)：构建组件库的利器，轻量、快速、产物标准。【✅】
      -  Next.js (Web 框架 / Framework)：基于 React 的全栈框架。它集成了路由系统、服务端渲染 (SSR)、静态生成 (SSG)、API 路由等功能【❌】
      -  如何做？
         1. apps下执行：pnpm create vite
            1. 在当前node22.20.0下，无法进行创建，降级到18.14.2，创建成功，但是create-vite 脚手架给你安装了一个 最新版本的 Vite (7.2.4)，而这个版本依赖于 Node.js 20.x 或 22.x 中新增的底层 API（如 crypto.hash）。所以报错。使用18.14.2创建成功后，node升级至22.20.0
            2. 然后返回至跟目录，在node22.20.0下执行：pnpm install进行重新链接
         2. 项目名：playground
         3. 框架：React
         4. 变体：TypeScript
   2. 激活 Monorepo 的魔法 (Workspace Protocol)
      1. 魔法🪄：指一个子包引用另一个子包时，不需发布到npm仓库，而是直接引用本地文件
      2. 在生成的playground/package.json中，dependencies中添加："@ui-demo/ui": "workspace:*"
      3. 返回至根目录下执行：pnpm install进行激活
         1. 如果过程中报错，确认是否缺少packages/ui/package.json相关配置
         2. packages/ui/package.json相关配置确保name为@ui-demo/ui，因为pnpm 在执行 install 时，拿着消费者（@ui-demo/ui）给出的标签去工作区找，发现 packages/ui 贴的标签却是 ui，所以报错找不到匹配项。
         3. 如果遇到fsevents问题，可在根目录下执行：pnpm install --no-optional，--no-optional 标志会告诉 pnpm：如果一个包被标记为 optionalDependencies（例如 fsevents），并且它在安装过程中失败了（无论是网络错误还是你遇到的 API 冲突），pnpm 应该忽略这个错误，并继续完成主依赖（以及我们的 workspace:* 软链接）的安装。
   3. 首次统一安装与验证
      1. 进入到apps/playground下，执行：pnpm dev，验证组件导入
         1. 或者可以在根目录下执行：pnpm --filter playground dev，使用 --filter 标志可以在 Monorepo 根目录执行子包的脚本
      2. 测试导入
         1. 首先在packages/ui/src/index.tsx中导出Button组件
            1. 确保Button组件存在
            2. 确保Button组件的导出正确
         2. 在 Playground 中导入： 打开 apps/playground/src/App.tsx 文件
         3. import { Button } from '@ui-demo/ui';
            1. 如果看到：已声明“Button”，但从未读取其值。ts(6133)找不到模块“@ui-demo/ui”或其相应的类型声明。ts(2307)，表明 Monorepo 软链接 已经成功建立，但 TypeScript 编译器 尚未正确识别
               1. apps/playground 的 TS 配置文件（通常是 tsconfig.json 或 tsconfig.app.json）的 compilerOptions.paths内添加："@ui-demo/ui": ["../../packages/ui/src"],
         4. 别忘了使用组件：<Button />
      3.  访问本地服务，验证组件库
         1.  Error：[vite] Internal server error: Failed to resolve entry for package "@ui-demo/ui". The package may have incorrect main/module/exports specified in its package.json.
         2.  原因：Vite 缺少打包入口
         3.  配置 main 或 exports
            1.  修改 packages/ui/package.json
            2.  在 开发环境 下将 main 或 module 字段指向你的 源码入口文件 (src/index.ts)，而不是打包后的产物 (dist/index.js)
            3.  具体配置："main": "src/index.ts",
2. 工程化配置
   - 保证后续的效率以及质量
   1. 组件库打包配置
      - 目的：确保组件库的打包产物符合预期的标准，比如将当前tsx/jsx编写的源码转译为可供其他项目（应用）使用的、优化过的js文件（dist/）
      - 工具：packages/ui/package.json 中配置 Vite 库模式 (Library Mode) 或 Rollup。
      - 选择：Vite 库模式 (Library Mode)【✅】
      - 优点：与apps/playground构建环境一致，且编译速度极快
      - 配置流程🍊
        1. 创建Vite配置文件：packages/ui/vite.config.ts
        2. 安装依赖packages/ui下执行：pnpm install vite typescript --save-dev
        3. 编译React代码，快速热重载：pnpm install @vitejs/plugin-react --save-dev
        4. 安装 React 依赖：pnpm install react react-dom @types/react @types/react-dom --save-dev
           1. package.json中添加："peerDependencies": {"react": ">=18.0.0","react-dom": ">=18.0.0"},
        5. 安装类型声明文件插件：pnpm add -D vite-plugin-dts【
           1. 22.20.0太高⚠️会导致安装失败，切换至18.14.2🉑】
           2. 安装成功后创建tsconfig.json文件
           3. 配置类型声明插件：将 vite-plugin-dts 添加到 vite.config.ts 中
        6. package.json中添加：
           - "type": "module" 【明确是一个ESM包】
           - "main": "dist/index.umd.js" 【CJS/UMD 入口】
           - "module": "dist/index.es.js" 【ESM 入口】
           - "types": "dist/index.d.ts"   【TS 入口】
           - "exports": "{".": { "import": "./dist/index.es.js", "require": "./dist/index.umd.js" } }
           - "scripts": { "build": "vite build" }
        7.  上述依赖安装以后，会发现根目录下pnpm-lock.yaml文件被修改了，这是因为Monorepo 提供了结构，而 pnpm 提供了高效且隔离的管理规则。
        8.  packages/ui下执行：pnpm build
            1.  会在packages/ui下生成dist目录，dist目录下生成了index.umd.js、index.es.js、index.d.ts、Button.d.ts
            2.  此时apps/playground下执行：pnpm dev
        9.  验证及使用组件库
            1.  比如ui/Button组件使其具有接收children、rest等能力
            2.  apps/playground/src/App.tsx内，调用Button组件以及传入props
            3.  Monorepo下执行：pnpm install
            4.  packages/ui下执行：pnpm build
            5.  apps/playground下执行：pnpm dev
            6.  验证组件能力
   2. 样式方案
      - 目的：确定当前组件库样式方案
      - 配置：需要在 packages/ui 中添加相应的构建依赖和配置，如：CSS-in-JS、CSS Modules、Sass/Less等
      - 选择：Sass/Less【✅】
      - 优点：可轻松实现主题变量、样式复用
   3. 文档系统
      - 目的：确保组件库的文档系统能够【自动】正确生成并展示组件的API文档，以及使用示例
      - 工具：Storybook 或 VitePress/Docusaurus (搭配 docs/ 目录)。
      - 选择：VitePress【✅】
      - 优点：基于Vite的静态站点生成器，🉑快速创建美观的组件文档（对应docs/ 目录）
<!-- 开发组件库 -->
1. 皮肤
2. 原子
3. 交互