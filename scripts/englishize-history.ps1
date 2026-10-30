# 新会话一键跑（在 OrangeKnows 当会话根的终端里执行）
#
#   cd C:\Users\OwenJiong\Desktop\OrangeKnows\site
#   powershell -NoProfile -File .\scripts\englishize-history.ps1
#
# 为什么必须在新会话根里跑：构建工具（esbuild）作为被派生的子进程，写文件被限制在「会话工作区」内；
# 在本工作区之外跑构建会在 node_modules\.vite\deps_temp_* 报 Access is denied（2026-10-30 两次复现）。
# git 与 pnpm 自身的写入不受此限，所以只有 build/deploy 需要新会话根。

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
'--- 0) 位置确认（必须在新工作区，否则构建会失败）---'
'cwd: ' + (Get-Location).Path
if ((Get-Location).Path -notlike '*OrangeKnows*') { throw '不在 OrangeKnows 工作区内，停止：构建会被沙箱拦' }

'--- 1) 构建门禁（三行绿：内容红线 / CSS 自检 / canonical-hreflang）---'
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:GIT_SHA = $null
pnpm run build 2>&1 | Select-Object -Last 4

'--- 2) 提交未落盘的文件（如 docs 改动）---'
git add -A
$dirty = (git status --porcelain | Out-String).Trim()
if ($dirty) {
  git commit -q -m "Docs: English strategy twin and the English-first commit-message tool"
  '已提交'
} else { '无改动可提交' }

'--- 3) 提交历史英文化（每条 subject 改英文，保留中文正文行）---'
git filter-branch -f --msg-filter "python scripts/reword.py" -- --all 2>&1 | Select-Object -Last 3
'--- 新历史（前 8 条）---'
git log --oneline -8

'--- 4) 强推（历史被改写，必须 lease 保护）---'
$env:GH_TOKEN = (gh auth token)
git -c credential.helper='!gh auth git-credential' push --force-with-lease -v origin refs/heads/main:refs/heads/main 2>&1 | Select-String -Pattern 'forced update|main -> main|rejected|up-to-date' | Select-Object -First 3
$env:GH_TOKEN = $null
'HEAD=' + (git rev-parse --short HEAD).Trim() + ' / 远端=' + ((git ls-remote origin refs/heads/main 2>&1 | Out-String) -split "`t")[0].Substring(0, 7)

'--- 5) 重新发布（链头 built_from 必须指向改写后存在的提交）---'
$env:WRANGLER_SEND_METRICS = 'false'
powershell -NoProfile -File .\scripts\deploy.ps1 2>&1 | Select-Object -Last 2

'--- 6) 线上核对 ---'
Start-Sleep -Seconds 6
$ip = '104.21.37.191'
foreach ($p in @('/', '/zh/', '/tools/pricing-calculator/', '/verify/')) {
  $code = curl.exe -sS --resolve orangeknows.com:443:$ip "https://orangeknows.com$p" -o NUL -w '%{http_code}' --max-time 25 2>$null
  ('  ' + $code + ' ' + $p)
}
$c = curl.exe -sS --resolve orangeknows.com:443:$ip https://orangeknows.com/chain.json --max-time 25 2>$null | ConvertFrom-Json
'链: count=' + $c.count + ' built_from=' + $c.built_from + ' / 远端 HEAD=' + ((git ls-remote origin refs/heads/main 2>&1 | Out-String) -split "`t")[0].Substring(0, 7)
'DONE'
