<!-- 虽然是QA，梳理下来基本为整体的构建思路了 -->

<!-- Monorepo架构 -->
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
      - 选择：Sass【✅】
      - 优点：可轻松实现主题变量、样式复用、使用 Mixins、Functions 和嵌套来组织复杂的样式，提高可维护性。且Vite对Sass有内置支持
      - 配置流程🍊
        1. 安装 Sass (更具体地说是 dart-sass)packages/ui执行：pnpm add -D sass
        3. 创建Sass文件：packages/ui/src/Button.module.scss
        4. 修改组件导入为：import './Button.module.scss'
        5. 在组件内使用SCSS Modules
        6. 验证组件样式
           1. 在 packages/ui 中运行： pnpm build。
           2. 在 apps/playground 中运行： pnpm dev。
           3. 发现样式类名有，但是样式没有生效
           4. apps/playground/src/App.tsx内，需要导入组件库打包后的样式文件
              1. 导入：import '@ui-demo/ui/dist/index.css'
              2. 且需要在packages/ui/package.json.exports内添加："./dist/ui.css": "./dist/ui.css"【声明CSS文件的导入路径‼️】
           5. 验证
   3. 文档系统
      - 目的：确保组件库的文档系统能够【自动】正确生成并展示组件的API文档，以及使用示例
      - 工具：Storybook 或 VitePress/Docusaurus (搭配 docs/ 目录)。
      - 选择：VitePress【✅】
      - 优点：基于Vite的静态站点生成器，轻量和快速，🉑快速创建美观的组件文档（对应docs/ 目录）
      - 配置流程🍊
        1. apps下创建docs目录
        2. apps/docs下执行
           1. pnpm init
           2. 安装 VitePress 依赖：pnpm add -D vitepress vue
              1. 为什么涉及到vue：VitePress 是一个基于 Vite 的静态站点生成器，它使用 Vue 组件来构建页面。
        3. 安装 VitePress 相关依赖【Node：18.14.2】
           1. 配置文件 apps/docs/.vitepress/config.js
           2. 创建文档入口： 创建 apps/docs/index.md 文件作为文档首页
           3. 配置脚本： 修改 apps/docs/package.json，添加启动和构建文档的脚本。
           4. 配置 VitePress 渲染 React 组件：pnpm add react react-dom
        4. 配置 VitePress 骨架
           1. apps/docs/.vitepress/config.js相关配置：用于定义文档的标题、描述、主题等基本信息。
           2. 创建 VitePress 渲染入口 (apps/docs/.vitepress/theme/index.js)
           3. 创建 React 容器 Vue 组件 (apps/docs/.vitepress/theme/components/ReactWrapper.vue)创建一个 Vue 组件，它的作用是获取 props，然后使用 ReactDOM 将你的 React 组件渲染到一个 DOM 元素中
           4. 创建文档页面 (apps/docs/components/button.md)
           5. 在 apps/docs 目录下创建 vite.config.js
           6. apps/docs下执行：pnpm docs:dev
              1. 访问后，点击进入Components，路由不匹配
              2. http://localhost:5174/components/button.html
              3. VitePress 似乎在寻找一个带有 .html 后缀的页面，而 Markdown 文件是 .md
              4. 修正 VitePress 路由配置：apps/docs/.vitepress/config.js，确保 sidebar 和 nav 配置中的链接 不带任何后缀
              5. 确认Button.md是否存在于 apps/docs/components 下‼️
           7. 成功启动VitePress解决404问题后，如果访问Button模块import { Button } from '@ui-demo/ui';解析失败
              1. 原因：alias配置错误，导入包路径不被识别
                 1. TODO：为什么不被识别？
              2. 修正：apps/docs/vite.config.js下配置 '@ui-demo/ui': '/Users/ymc/Study/React/ui-demo/packages/ui/src/Button.tsx',
           8. 初始文档首页
              1. VitePress 默认主题: VitePress 附带了一个默认主题，它会自动为根目录下的 index.md 文件应用一个布局。
              2. 即使index.md文件不存在，也会渲染出基本的结构，导航栏、侧边栏、页脚
              3. 配置驱动：导航栏和侧边栏是根据apps/docs/.vitepress/config.js 文件中的 nav 和 sidebar 配置生成的‼️
<!-- 开发组件库 -->
3. 皮肤：全局组件库的主题和变量系统
   1. 定义全局 SCSS 变量
      1. 创建：packages/ui/src/styles/theme.scss
   2. 在 VitePress 的 Vite 配置中设置全局自动导入
      1. apps/docs/.vitepress/config.js 文件，添加 css 配置
      2. 【❌】配置scss全局变量导入时，如果使用additionalData，以及@import方式，会影响Button.module.scss内【@use "sass:color";】的引入，导致报错，具体处理方案为，去掉【@use "sass:color";】使用到【color.adjust】函数变更为【adjust-color】‼️
   3. 组件样式中使用全局变量
      1. 修改 packages/ui/src/Button.module.scss：
      2. 具体为：@use "sass:color";，同时使用【@use "./styles/theme.scss" as theme; // 使用 @use 引入主题，并命名为 'theme'】
      3. 使用全局变量：$primary-color: theme.$global-primary-color;
   4. 检查样式
4. 风格：拟物化
5. 原子层
   1. Sass Mixin/Function
   2. Icon实现
      1. 资源库：https://lucide.dev/icons/
      2. 下载所需icon对应的svg文件
      3. 将svg文件转换为React组件
         1. SVGR方案
            1. 在 packages/ui 目录下执行（如果配置了工作区）：pnpm add @svgr/cli【Node: 18.14.2✅】
            2. 如果没有配置工作区则在 Monorepo 根目录执行：pnpm add -w @svgr/cli
            3. packages/ui/package.json中添加："generate:icons": "svgr --config-file ../../svgr.config.js -d src/components/Icon/generated -- src/assets/icons"
            4. SVGR 配置优化 (svgr.config.js)(放在 Monorepo 根目录)
            5. 配置完成后，进入 packages/ui 目录并运行脚本：pnpm run generate:icons
            6. Icon 组件封装：packages/ui/src/components/Icon/index.tsx 来封装所有生成的图标
      4. 使用icon组件【demo】
         1. 确保icon导出packages/ui/src/index.ts：export * from './components/Icon/index.tsx';
         2. // packages/ui/src/components/Button/Demo.tsx (或者直接在文档 demo 中)
      5. 拟物化风格实现思路
         1. 由于Lucide图标是基于线条（无填充）实现的，不能直接给SVG元素添加拟物化阴影
         2. 解决方案：通过 包裹容器 模拟 图标被嵌入、图标浮出的效果
            1. 默认嵌入（Default/Inset） 和 交互浮出（Hover/Active）。
6. 交互层

<!-- Micro Frontend架构：微前端改造方案 -->
1. 什么是微前端
   - 核心思想是将一个庞大、单体的前端应用，拆分成多个小型的、可以独立开发和部署的子应用，然后在运行时将它们聚合成一个整体，呈现给用户。
2. 为什么选择微前端
   - 简单来说，拆分为了开发者、融合是为了用户
   - 工程视角为什么要拆：
     - 拆分：便于维护和扩展
     - 项目越来越大（巨石应用）
       - 构建慢：改一行代码，打包要 10 分钟。
       - 维护难：代码耦合严重，牵一发而动全身，新人不敢改代码。
       - 协作乱：几十个前端在一个仓库里提交代码，冲突不断。
       - 技术栈锁死：五年前的项目用的是 jQuery 或 AngularJS，新功能想用 Vue3/React，但在老项目里没法混用。
       - 发布阻塞：A 模块的一个小 Bug 导致 B 模块的新功能也没法上线。
     - 拆分就是为了解决这些问题：让不同的团队维护不同的子应用，独立开发、独立部署、技术栈无关。
   - 用户视角为什么要合：
     - 统一的入口：我不希望访问“订单”是一个域名，访问“个人中心”又是另一个域名。
     - 统一的体验：导航栏、侧边栏、登录状态应该是全局保持的，而不是跳来跳去。
     - 无感切换：点击菜单时，页面应该是局部刷新的（SPA 体验），而不是整个浏览器白屏刷新。
3. 为什么选择【wujie】
   1. 子应用改造几乎零侵入，无需改动构建工具
   2. 主应用接入：组件式写法
   3. 文档清晰，社区体量 较 大
   4. 调试难度低：iframe内调试，环境纯净
4. 安装依赖【Node: 18.14.2✅】
   1. 根目录：pnpm install wujie wujie-react concurrently -w
5. Monorepo 启动命令改造
   1. 启动 微应用：playground 运行在固定端口 3001：【"start:micro:playground": "pnpm -F playground dev --port 3001"】
   2. 启动 基座应用：docs (或 docs:dev) 运行在默认端口 (假设 4173)：【"start:main:docs": "pnpm -F docs docs:dev"】
   3. 统一启动命令：并行启动基座和微应用【"start:wujie": "concurrently \"pnpm start:main:docs\" \"pnpm start:micro:playground\""】
6. 微应用配置调整补充
   - apps/playground/vite.config.ts
     - base: '/',
     - server: {cors: true,},
     - build: {outDir: 'dist',}
7. 基座应用改造
   - 将 apps/docs 改造为 Wujie 的 基座应用，以便它可以加载 playground。
     1. 若apps/docs/.vitepress/theme/index.js 不存在，需要创建它
     2. 引入wujie
        1. 因为apps/docs是使用vitePress构建的，所以先创建wujie容器vue组件apps/docs/.vitepress/theme/components/WujieContainer.vue
        2. 在 index.js 中注册 Wujie 容器
        3. 即可在任何 Markdown 文件中加载你的 playground 微应用了
           1. 比如创建：apps/docs/components/micro-app.md
8. 配置路由
   1. apps/docs/.vitepress/config.js文件，在nav内配置：{ text: '微前端演示', link: '/micro-app' }
9.  启动
  - 根目录：pnpm start:wujie
  - 启动后，访问vitepress，也即docs，一定会碰到[plugin:vue] [vue/compiler-sfc] This experimental syntax requires enabling one of the following parser plugin(s): "jsx", "flow", "typescript".
    - 原因是，在vue文件内使用了jsx语法，而vue默认的编译器不能识别和处理.vue文件内的jsx语法
    - 解决方案：启用 VitePress 的 JSX 支持
      - 安装 JSX 插件，在 apps/docs 目录下安装 Vue 官方提供的 JSX 插件：pnpm install @vitejs/plugin-vue-jsx
      - 修改 Vite 配置，在apps/docs/.vitepress/config.js文件的vite.plugins内添加：vueJsx({include: /\.(jsx|tsx)$/,})，当然别忘了引入：import vueJsx from '@vitejs/plugin-vue-jsx';
      - apps/docs/package.json配置【"type": "module"】
      - apps/docs/.vitepress/theme/components/WujieContainer.vue内<script setup lang="jsx">