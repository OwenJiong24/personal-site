# 本机发布脚本：构建（含红线检查）→ 上传到 Cloudflare Pages
# 前置：项目根目录有 .cf-token 文件，内容是一个 Cloudflare API Token，
#       权限只需要 Account · Cloudflare Pages · Edit（模板「Edit Cloudflare Pages」即可）。
#       .cf-token 已在 .gitignore 里，不进仓库；脚本不打印令牌内容。
# 用法：在 personal-site 目录里执行  .\scripts\deploy.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$tokenFile = Join-Path $root '.cf-token'
if (Test-Path $tokenFile) {
  $env:CLOUDFLARE_API_TOKEN = (Get-Content $tokenFile -Raw).Trim()
  if ($env:CLOUDFLARE_API_TOKEN.Length -lt 20) { Write-Host '.cf-token 内容看起来太短，检查是否粘全'; exit 1 }
  Write-Host '用 .cf-token 里的 API Token 发布'
} else {
  # 没有 .cf-token 就用 wrangler 已登录的 OAuth 配置（wrangler login 过的机器）
  Write-Host '未找到 .cf-token，使用 wrangler 已登录的账号配置发布'
}
$env:WRANGLER_SEND_METRICS = 'false'
if (-not $env:PUBLIC_SITE_URL) { $env:PUBLIC_SITE_URL = 'https://jiong-bvw.pages.dev' }
# 把当前提交号烘进产物：线上页面能对上 Git 里的哪一次提交
if (-not $env:GIT_SHA) {
  $sha = (git rev-parse --short HEAD 2>$null)
  if ($sha) { $env:GIT_SHA = $sha.Trim() }
}

$project = 'jiong'
Write-Host "构建（站点地址 $($env:PUBLIC_SITE_URL)）…"
pnpm run build
if ($LASTEXITCODE) { exit $LASTEXITCODE }

Write-Host "上传 dist → Cloudflare Pages 项目 $project …"
npx --yes wrangler@latest pages deploy dist --project-name $project --branch main
if ($LASTEXITCODE) { exit $LASTEXITCODE }

Write-Host "完成：$($env:PUBLIC_SITE_URL)"
