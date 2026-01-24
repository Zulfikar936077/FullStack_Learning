# Script to complete git commit and push with optimizations
# Run this script in PowerShell

Write-Host "=== Git Commit/Push Completion Script ===" -ForegroundColor Cyan
Write-Host ""

# Navigate to repository
$repoPath = "d:\Weave Srl\CursorAI\Full-Stack Learning_Hasan\FullStack-Learning"
Set-Location $repoPath

# Remove any lock files
Write-Host "Removing git lock files..." -ForegroundColor Yellow
if (Test-Path ".git\index.lock") { 
    Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue
    Write-Host "  Removed index.lock" -ForegroundColor Green
}
if (Test-Path ".git\gc.pid.lock") { 
    Remove-Item ".git\gc.pid.lock" -Force -ErrorAction SilentlyContinue
    Write-Host "  Removed gc.pid.lock" -ForegroundColor Green
}
Get-ChildItem .git -Filter "*.lock" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue

# Check git status
Write-Host "`nChecking git status..." -ForegroundColor Yellow
git status

# Add new files
Write-Host "`nAdding .gitignore and GIT_SPEED_FIX.md..." -ForegroundColor Yellow
git add .gitignore GIT_SPEED_FIX.md
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Files added successfully" -ForegroundColor Green
} else {
    Write-Host "  Failed to add files. Please close Cursor/VS Code and try again." -ForegroundColor Red
    exit 1
}

# Commit
Write-Host "`nCommitting changes..." -ForegroundColor Yellow
git commit -m "Just Test"
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Commit successful" -ForegroundColor Green
} else {
    Write-Host "  Commit failed. Please close Cursor/VS Code and try again." -ForegroundColor Red
    exit 1
}

# Push
Write-Host "`nPushing to remote..." -ForegroundColor Yellow
git push origin Hasan
if ($LASTEXITCODE -eq 0) {
    Write-Host "  Push successful!" -ForegroundColor Green
} else {
    Write-Host "  Push failed. You may need to authenticate with GitHub." -ForegroundColor Red
    Write-Host "  Try: git push origin Hasan" -ForegroundColor Yellow
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
