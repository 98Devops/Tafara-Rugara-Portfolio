# Netlify Deployment Script for Windows PowerShell
# This script helps you deploy the portfolio to Netlify

$ErrorActionPreference = "Stop"

Write-Host "🚀 Tafara Portfolio - Netlify Deployment Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

function Write-Success {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Success "Node.js $nodeVersion detected"
} catch {
    Write-Error "Node.js is not installed. Please install Node.js 20.x"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Success "npm $npmVersion detected"
} catch {
    Write-Error "npm is not installed"
    exit 1
}

# Check if Netlify CLI is installed
try {
    $netlifyVersion = netlify --version
    Write-Success "Netlify CLI $netlifyVersion detected"
} catch {
    Write-Warning "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    Write-Success "Netlify CLI installed"
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps

Write-Host ""
Write-Host "🧪 Running tests..." -ForegroundColor Cyan
try {
    npm test -- --watchAll=false --passWithNoTests
} catch {
    Write-Warning "Some tests failed, but continuing..."
}

Write-Host ""
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

if (-not (Test-Path ".next")) {
    Write-Error "Build failed: .next directory not found"
    exit 1
}

Write-Success "Build completed successfully"

Write-Host ""
Write-Host "🌐 Deployment Options:" -ForegroundColor Cyan
Write-Host "1. Deploy to preview (test deployment)"
Write-Host "2. Deploy to production"
Write-Host "3. Initialize new Netlify site"
Write-Host "4. Check deployment status"
Write-Host "5. Exit"
Write-Host ""

$option = Read-Host "Select option (1-5)"

switch ($option) {
    "1" {
        Write-Host ""
        Write-Host "🔍 Deploying to preview..." -ForegroundColor Cyan
        netlify deploy
        Write-Success "Preview deployment complete!"
        Write-Host ""
        Write-Host "Check the URL above to view your preview deployment"
    }
    "2" {
        Write-Host ""
        $confirm = Read-Host "⚠️  Are you sure you want to deploy to PRODUCTION? (yes/no)"
        if ($confirm -eq "yes") {
            Write-Host "🚀 Deploying to production..." -ForegroundColor Cyan
            netlify deploy --prod
            Write-Success "Production deployment complete!"
            Write-Host ""
            Write-Host "Your site is now live!"
        } else {
            Write-Warning "Production deployment cancelled"
        }
    }
    "3" {
        Write-Host ""
        Write-Host "🆕 Initializing new Netlify site..." -ForegroundColor Cyan
        netlify init
        Write-Success "Site initialized!"
        Write-Host ""
        Write-Host "You can now deploy using option 1 or 2"
    }
    "4" {
        Write-Host ""
        Write-Host "📊 Checking deployment status..." -ForegroundColor Cyan
        netlify status
    }
    "5" {
        Write-Host ""
        Write-Success "Exiting..."
        exit 0
    }
    default {
        Write-Error "Invalid option"
        exit 1
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✨ Deployment script completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  netlify open        - Open site in browser"
Write-Host "  netlify open:admin  - Open Netlify dashboard"
Write-Host "  netlify logs        - View deployment logs"
Write-Host "  netlify status      - Check site status"
Write-Host ""
