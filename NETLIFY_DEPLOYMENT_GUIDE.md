# Netlify Deployment Guide

Complete guide for deploying the Tafara Portfolio to Netlify with automated CI/CD.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Netlify Configuration](#netlify-configuration)
5. [Environment Variables](#environment-variables)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with repository access
- ✅ Netlify account (free tier works)
- ✅ Node.js 20.x installed locally
- ✅ Git installed and configured
- ✅ Project builds successfully locally (`npm run build`)

---

## Initial Setup

### 1. Verify Local Build

```bash
# Navigate to project directory
cd tafara-portfolio

# Install dependencies
npm install --legacy-peer-deps

# Run tests
npm test

# Build the project
npm run build

# Verify build output
ls -la .next
```

If the build succeeds, you're ready to deploy!

---

## GitHub Repository Setup

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website ready for deployment"

# Create repository on GitHub (via web interface)
# Then add remote and push
git remote add origin https://github.com/YOUR_USERNAME/tafara-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

| Secret Name | Description | How to Get |
|------------|-------------|------------|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | Netlify → User Settings → Applications → Personal access tokens → New access token |
| `NETLIFY_SITE_ID` | Your Netlify site ID | Netlify → Site settings → General → Site details → API ID |
| `LHCI_GITHUB_APP_TOKEN` | Lighthouse CI token (optional) | GitHub → Settings → Developer settings → Personal access tokens |

---

## Netlify Configuration

### Method 1: Import from GitHub (Recommended)

1. **Log in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect to GitHub**
   - Select "GitHub"
   - Authorize Netlify to access your repositories
   - Select your `tafara-portfolio` repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Advanced Build Settings**
   - Node version: 20
   - Environment variables:
     ```
     NODE_VERSION=20
     NEXT_TELEMETRY_DISABLED=1
     NODE_ENV=production
     ```

5. **Deploy Site**
   - Click "Deploy site"
   - Wait for initial deployment (2-5 minutes)

### Method 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify site
netlify init

# Follow prompts:
# - Create & configure a new site
# - Choose your team
# - Site name: tafara-portfolio (or your preferred name)
# - Build command: npm run build
# - Publish directory: .next

# Deploy
netlify deploy --prod
```

---

## Environment Variables

### Required Environment Variables

Set these in Netlify Dashboard → Site settings → Environment variables:

```bash
# Node.js Configuration
NODE_VERSION=20
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Build Configuration
NPM_FLAGS=--legacy-peer-deps
```

### Optional Environment Variables

```bash
# Analytics (if using)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# API Keys (if needed)
# NEXT_PUBLIC_API_KEY=your-api-key
```

---

## CI/CD Pipeline

The project includes automated CI/CD via GitHub Actions. Every push or pull request triggers:

### Pipeline Stages

1. **Lint & Type Check** (1-2 min)
   - ESLint validation
   - TypeScript type checking

2. **Unit Tests** (2-3 min)
   - Jest unit tests
   - Coverage reporting
   - Runs on Node 18.x and 20.x

3. **Build Test** (2-3 min)
   - Production build verification
   - Output validation

4. **E2E Tests** (3-5 min, main branch only)
   - Playwright end-to-end tests
   - Cross-browser testing

5. **Deploy to Netlify** (2-4 min)
   - Automatic deployment
   - Preview for PRs
   - Production for main branch

6. **Lighthouse Audit** (2-3 min, production only)
   - Performance scoring
   - Accessibility checks
   - SEO validation

### Workflow Triggers

```yaml
# Triggers on:
- Push to main or develop branches
- Pull requests to main or develop branches
```

### Viewing Pipeline Status

- Go to your GitHub repository
- Click "Actions" tab
- View running/completed workflows
- Click on any workflow to see detailed logs

---

## Deployment Process

### Automatic Deployment (Recommended)

**Every push to `main` branch automatically deploys to production:**

```bash
# Make changes
git add .
git commit -m "Update: Description of changes"
git push origin main

# GitHub Actions will:
# 1. Run all tests
# 2. Build the project
# 3. Deploy to Netlify
# 4. Run Lighthouse audit
```

**Pull requests create preview deployments:**

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add: New feature"
git push origin feature/new-feature

# Create PR on GitHub
# Preview deployment URL will be commented on PR
```

### Manual Deployment

**Using Netlify CLI:**

```bash
# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

**Using Netlify Dashboard:**

1. Go to Netlify Dashboard
2. Select your site
3. Click "Deploys" tab
4. Click "Trigger deploy" → "Deploy site"

---

## Post-Deployment Verification

### 1. Check Deployment Status

```bash
# Using Netlify CLI
netlify status

# Or visit Netlify Dashboard
# https://app.netlify.com/sites/YOUR_SITE_NAME/deploys
```

### 2. Verify Site Functionality

Visit your deployed site and check:

- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ All pages accessible
- ✅ Images load properly
- ✅ Contact form works
- ✅ Document downloads work
- ✅ Mobile responsive
- ✅ No console errors

### 3. Performance Check

```bash
# Run Lighthouse locally
npm run lighthouse

# Or use online tools:
# - PageSpeed Insights: https://pagespeed.web.dev/
# - GTmetrix: https://gtmetrix.com/
```

---

## Troubleshooting

### Build Failures

**Error: "Build failed"**

```bash
# Check build logs in Netlify Dashboard
# Common fixes:

# 1. Clear cache and retry
netlify build --clear-cache

# 2. Verify Node version
# In netlify.toml, ensure NODE_VERSION=20

# 3. Check dependencies
npm ci --legacy-peer-deps
npm run build
```

**Error: "Module not found"**

```bash
# Ensure all dependencies are in package.json
npm install --save missing-package

# Commit and push
git add package.json package-lock.json
git commit -m "Fix: Add missing dependency"
git push
```

### Deployment Issues

**Error: "NETLIFY_AUTH_TOKEN not set"**

1. Go to GitHub repository → Settings → Secrets
2. Verify `NETLIFY_AUTH_TOKEN` is set
3. Regenerate token if needed from Netlify dashboard

**Error: "NETLIFY_SITE_ID not set"**

1. Go to Netlify → Site settings → General
2. Copy "API ID"
3. Add as `NETLIFY_SITE_ID` secret in GitHub

### Runtime Errors

**Error: "Page not found (404)"**

- Check `netlify.toml` redirects configuration
- Verify Next.js routing is correct
- Clear Netlify cache and redeploy

**Error: "Images not loading"**

- Check image paths are relative
- Verify images are in `public/` directory
- Check CSP headers in `netlify.toml`

### Performance Issues

**Slow load times:**

```bash
# 1. Analyze bundle size
npm run build
npx @next/bundle-analyzer

# 2. Optimize images
# Use Next.js Image component
# Compress images before upload

# 3. Enable caching
# Verify cache headers in netlify.toml
```

---

## Monitoring and Maintenance

### 1. Set Up Monitoring

**Netlify Analytics:**
- Enable in Netlify Dashboard → Analytics
- Track page views, bandwidth, performance

**Error Tracking:**
- Consider Sentry or similar service
- Add error boundary components

### 2. Regular Updates

```bash
# Update dependencies monthly
npm outdated
npm update

# Test thoroughly
npm test
npm run build

# Deploy
git add .
git commit -m "Update: Dependencies"
git push
```

### 3. Backup Strategy

- GitHub repository is your primary backup
- Netlify keeps deployment history
- Export site settings periodically

---

## Advanced Configuration

### Custom Domain

1. **Add Domain in Netlify:**
   - Site settings → Domain management
   - Add custom domain
   - Follow DNS configuration instructions

2. **Configure DNS:**
   ```
   # Add these records to your DNS provider:
   A record: @ → 75.2.60.5
   CNAME: www → your-site.netlify.app
   ```

3. **Enable HTTPS:**
   - Automatic with Let's Encrypt
   - Enabled by default in Netlify

### Branch Deploys

Enable branch deploys for testing:

```toml
# In netlify.toml
[context.branch-deploy]
  command = "npm run build"
```

### Deploy Previews

Configure deploy preview settings:

```toml
[context.deploy-preview]
  command = "npm run build"
  environment = { NODE_ENV = "production" }
```

---

## Useful Commands

```bash
# Netlify CLI Commands
netlify status              # Check site status
netlify open               # Open site in browser
netlify open:admin         # Open Netlify dashboard
netlify deploy             # Deploy to preview
netlify deploy --prod      # Deploy to production
netlify logs               # View function logs
netlify env:list           # List environment variables
netlify env:set KEY value  # Set environment variable

# Build Commands
npm run build              # Production build
npm run dev                # Development server
npm test                   # Run tests
npm run lint               # Lint code
npm run lighthouse         # Performance audit
```

---

## Support and Resources

- **Netlify Documentation:** https://docs.netlify.com/
- **Next.js on Netlify:** https://docs.netlify.com/frameworks/next-js/
- **GitHub Actions:** https://docs.github.com/en/actions
- **Project Issues:** Create issue in GitHub repository

---

## Checklist

Before going live, ensure:

- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] GitHub secrets set up
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Performance optimized (Lighthouse score >90)
- [ ] SEO meta tags configured
- [ ] Analytics set up
- [ ] Error monitoring configured
- [ ] Backup strategy in place

---

**Deployment Status:** Ready for production! 🚀

For questions or issues, refer to the troubleshooting section or create an issue in the GitHub repository.
