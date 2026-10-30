// 构建时注入的提交号。Vite 的 define 只替换 .ts/.js 模块，.astro 文件里不生效，
// 所以取值集中在这里，页面与接口都从这里读。
declare const GIT_SHA: string;

export const gitSha = typeof GIT_SHA === 'string' ? GIT_SHA : '';
