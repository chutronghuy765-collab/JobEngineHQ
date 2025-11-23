# Script để chạy website
Write-Host "=== JobEngineHQ V2 - Setup Script ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

# Kiểm tra npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found!" -ForegroundColor Red
    exit 1
}

# Kiểm tra file .env
Write-Host "Checking .env file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
    $envContent = Get-Content ".env"
    if ($envContent -match "placeholder") {
        Write-Host "⚠ Warning: .env contains placeholder values" -ForegroundColor Yellow
        Write-Host "Please update .env with your Supabase credentials" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ .env file not found" -ForegroundColor Yellow
    Write-Host "Creating .env file with placeholder values..." -ForegroundColor Yellow
    @"
REACT_APP_SUPABASE_URL=https://placeholder.supabase.co
REACT_APP_SUPABASE_ANON_KEY=placeholder_key
"@ | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✓ .env file created. Please update with your Supabase credentials!" -ForegroundColor Yellow
}

# Kiểm tra node_modules
Write-Host "Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
}

# Chạy website
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host "Website will open at: http://localhost:3000" -ForegroundColor Green
Write-Host ""
npm start

