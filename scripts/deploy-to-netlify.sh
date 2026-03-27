#!/bin/bash

# Netlify Deployment Script
# This script helps you deploy the portfolio to Netlify

set -e  # Exit on error

echo "🚀 Tafara Portfolio - Netlify Deployment Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 20.x"
    exit 1
fi

print_success "Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

print_success "npm $(npm --version) detected"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    print_warning "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    print_success "Netlify CLI installed"
else
    print_success "Netlify CLI $(netlify --version) detected"
fi

echo ""
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "🧪 Running tests..."
npm test -- --watchAll=false --passWithNoTests || {
    print_warning "Some tests failed, but continuing..."
}

echo ""
echo "🔨 Building project..."
npm run build

if [ ! -d ".next" ]; then
    print_error "Build failed: .next directory not found"
    exit 1
fi

print_success "Build completed successfully"

echo ""
echo "🌐 Deployment Options:"
echo "1. Deploy to preview (test deployment)"
echo "2. Deploy to production"
echo "3. Initialize new Netlify site"
echo "4. Check deployment status"
echo "5. Exit"
echo ""

read -p "Select option (1-5): " option

case $option in
    1)
        echo ""
        echo "🔍 Deploying to preview..."
        netlify deploy
        print_success "Preview deployment complete!"
        echo ""
        echo "Check the URL above to view your preview deployment"
        ;;
    2)
        echo ""
        read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "🚀 Deploying to production..."
            netlify deploy --prod
            print_success "Production deployment complete!"
            echo ""
            echo "Your site is now live!"
        else
            print_warning "Production deployment cancelled"
        fi
        ;;
    3)
        echo ""
        echo "🆕 Initializing new Netlify site..."
        netlify init
        print_success "Site initialized!"
        echo ""
        echo "You can now deploy using option 1 or 2"
        ;;
    4)
        echo ""
        echo "📊 Checking deployment status..."
        netlify status
        ;;
    5)
        echo ""
        print_success "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "================================================"
echo "✨ Deployment script completed!"
echo ""
echo "Useful commands:"
echo "  netlify open        - Open site in browser"
echo "  netlify open:admin  - Open Netlify dashboard"
echo "  netlify logs        - View deployment logs"
echo "  netlify status      - Check site status"
echo ""
