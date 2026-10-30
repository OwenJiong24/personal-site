# 本机发布脚本：构建（含红线检查）→ 上传到 Cloudflare Pages
# 前置：项目根目录有 .cf-token 文件，内容是一个 Cloudflare API Token，
#       权限只需要 Account · Cloudflare Pages · Edit（模板「Edit Cloudflare Pages」即可）。
#       .cf-token 已在 .gitignore 里，不进仓库；脚本不打印令牌内容。
# 用法：在 personal-site 目录里执行  .\scripts\deploy.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$tokenFile = Join-Path $root '.cf-token'
if (-not (Test-Path $tokenFile)) {
  Write-Host '缺 .cf-token：请在 https://dash.cloudflare.com/profile/api-tokens 用模板「Edit Cloudflare Pages」建一个，写进本仓根目录的 .cf-token 文件'
  exit 1
}
$env:CLOUDFLARE_API_TOKEN = (Get-Content $tokenFile -Raw).Trim()
if ($env:CLOUDFLARE_API_TOKEN.Length -lt 20) { Write-Host '.cf-token 内容看起来太短，检查是否粘全'; exit 1 }
$env:WRANGLER_SEND_METRICS = 'false'
if (-not $env:PUBLIC_SITE_URL) { $env:PUBLIC_SITE_URL = 'https://jiong-bvw.pages.dev' }

$project = 'jiong'
Write-Host "构建（站点地址 $($env:PUBLIC_SITE_URL)）…"
pnpm run build
if ($LASTEXITCODE) { exit $LASTEXITCODE }

Write-Host "上传 dist → Cloudflare Pages 项目 $project …"
npx --yes wrangler@latest pages deploy dist --project-name $project --branch main
if ($LASTEXITCODE) { exit $LASTEXITCODE }

Write-Host "完成：$($env:PUBLIC_SITE_URL)"
