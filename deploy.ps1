# Full deploy: build → production deploy → re-point custom domain aliases to the new deployment.
# Prevents the "stale custom domain" class of bug (vercel alias set pins a specific deployment).
param([switch]$SkipBuild)

if (-not $SkipBuild) {
  Write-Host "==> build" -ForegroundColor Cyan
  npm run build
  if ($LASTEXITCODE -ne 0) { throw "build failed" }
  npm run lint
  if ($LASTEXITCODE -ne 0) { throw "lint failed" }
}

Write-Host "==> deploy" -ForegroundColor Cyan
$out = vercel --prod --yes 2>&1 | Out-String
$m = [regex]::Match($out, "https://[\w-]+\.vercel\.app")
if (-not $m.Success) { throw "could not parse deployment URL`n$out" }
$url = $m.Value.TrimEnd()
Write-Host "deployed: $url" -ForegroundColor Green

Write-Host "==> re-point custom domain aliases" -ForegroundColor Cyan
vercel alias set $url itzpratham.in | Out-Null
vercel alias set $url www.itzpratham.in | Out-Null

Write-Host "==> verify" -ForegroundColor Cyan
Start-Sleep 5
$tmp = "$env:TEMP\opencode\deploy-verify.html"
curl.exe -s --max-time 20 -o $tmp "https://itzpratham.in/"
$c = [System.IO.File]::ReadAllText($tmp)
if ($c.Contains("JAI BIKANER")) { Write-Host "itzpratham.in serving latest build: OK" -ForegroundColor Green }
else { Write-Host "WARNING: itzpratham.in may be serving stale content" -ForegroundColor Yellow }
