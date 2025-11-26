1. npm init -y（废弃使用npm）
   1. npm init初始化，-y表示默认配置
   2. 使用pnpm接替npm，因为要做Monorepo，npm（新版）虽然支持Workspace（工作区），但在处理“幽灵依赖”和“依赖提升”方面不如 pnpm 严格和高效。
   3. pnpm独有的pnpm.workspace.yaml文件可以非常精细的控制哪些目录属于工作区
2. pnpm init
   1. 不支持-y。移除 -y 是为了强调它不是一个完整的项目初始化工具。
3. pnpm create vite
4. pnpm --filter playground dev：使用 --filter 标志可以在 Monorepo 根目录执行子包的脚本