// 构建期取值：Astro 渲染页面跑在 Node 里，GIT_SHA 由 scripts/deploy.ps1 注入。
// 注意：Astro 配置没有顶层 define（那是 Vite 的键，会被丢掉），所以这里直接读环境变量，
// 取值只发生在构建时，产物里烘的是那一次构建的提交号。
export const gitSha = process.env.GIT_SHA ?? '';
