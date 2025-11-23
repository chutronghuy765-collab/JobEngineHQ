# Script để deploy schema lên Supabase
Write-Host "=== JobEngineHQ - Deploy Schema to Supabase ===" -ForegroundColor Cyan
Write-Host ""

$supabaseUrl = "https://avwspwhbkxyrdvwcibvq.supabase.co"
$sqlFile = Join-Path $PSScriptRoot "supabase-schema.sql"

Write-Host "📋 Schema file: $sqlFile" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Error: Schema file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Schema file found" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Deploy Instructions:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open Supabase Dashboard:" -ForegroundColor Yellow
Write-Host "   https://supabase.com/dashboard/project/avwspwhbkxyrdvwcibvq" -ForegroundColor White
Write-Host ""
Write-Host "2. Navigate to SQL Editor (menu on the left)" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Click 'New query'" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Copy the SQL from: $sqlFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Paste into SQL Editor and click 'Run'" -ForegroundColor Yellow
Write-Host ""

# Ask if user wants to open the file
$openFile = Read-Host "Do you want to open the SQL file now? (Y/N)"
if ($openFile -eq "Y" -or $openFile -eq "y") {
    notepad $sqlFile
    Write-Host ""
    Write-Host "✅ SQL file opened in Notepad" -ForegroundColor Green
    Write-Host "   Copy all content and paste into Supabase SQL Editor" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 After deploying, verify:" -ForegroundColor Cyan
Write-Host "   - Go to Table Editor" -ForegroundColor White
Write-Host "   - Check that 3 tables exist: users, jobs, applications" -ForegroundColor White
Write-Host ""

