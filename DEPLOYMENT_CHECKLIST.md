# 📋 Deployment Checklist

Use this checklist to ensure a smooth deployment to Netlify.

## Pre-Deployment

### Code Quality
- [ ] All tests passing locally (`npm test`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] `.next` directory created after build

### Repository
- [ ] Code committed to Git
- [ ] Pushed to GitHub repository
- [ ] Repository is public or Netlify has access
- [ ] `.gitignore` includes `node_modules`, `.next`, `.env.local`

### Configuration Files
- [ ] `netlify.toml` exists and configured
- [ ] `.github/workflows/ci.yml` exists
- [ ] `package.json` has correct scripts
- [ ] `next.config.ts` properly configured

---

## Netlify Setup

### Account & Site
- [ ] Netlify account created
- [ ] Site imported from GitHub
- [ ] Site name configured (optional)
- [ ] Custom domain added (optional)

### Build Settings
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Node version: `20`
- [ ] Install command: `npm install --legacy-peer-deps`

### Environment Variables
- [ ] `NODE_VERSION=20`
- [ ] `NODE_ENV=production`
- [ ] `NEXT_TELEMETRY_DISABLED=1`
- [ ] `NPM_FLAGS=--legacy-peer-deps`

### Plugins
- [ ] `@netlify/plugin-nextjs` enabled (auto-detected)

---

## GitHub Actions Setup

### Secrets Configuration
- [ ] `NETLIFY_AUTH_TOKEN` added to GitHub secrets
  - Get from: Netlify → User Settings → Applications → New token
- [ ] `NETLIFY_SITE_ID` added to GitHub secrets
  - Get from: Netlify → Site settings → API ID
- [ ] `LHCI_GITHUB_APP_TOKEN` added (optional, for Lighthouse)

### Workflow Verification
- [ ] `.github/workflows/ci.yml` exists
- [ ] Workflow triggers on push to main
- [ ] Workflow triggers on pull requests
- [ ] All jobs configured correctly

---

## First Deployment

### Initial Deploy
- [ ] Trigger first deployment (push to main or manual)
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check deployment logs for errors
- [ ] Note the deployment URL

### Verification
- [ ] Site loads at Netlify URL
- [ ] Homepage displays correctly
- [ ] All navigation links work
- [ ] Images load properly
- [ ] Fonts load correctly
- [ ] No console errors in browser

### Page Testing
- [ ] Home page (`/`)
- [ ] What I Do page (`/what-i-do`)
- [ ] Projects page (`/projects`)
- [ ] Experience page (`/experience`)
- [ ] Contact page (`/contact`)

### Functionality Testing
- [ ] Navigation menu works (desktop)
- [ ] Mobile menu works
- [ ] Contact form submits (WhatsApp opens)
- [ ] CV download works
- [ ] All external links work
- [ ] Social media links work

### Performance Testing
- [ ] Page load time <3 seconds
- [ ] Images load quickly
- [ ] Animations smooth (60fps)
- [ ] No layout shifts
- [ ] Mobile responsive

---

## CI/CD Verification

### GitHub Actions
- [ ] Workflow runs on push
- [ ] All jobs complete successfully
- [ ] Tests pass in CI
- [ ] Build succeeds in CI
- [ ] Deployment succeeds

### Pull Request Flow
- [ ] Create test PR
- [ ] CI runs automatically
- [ ] Preview deployment created
- [ ] Preview URL commented on PR
- [ ] Preview site works correctly

### Production Flow
- [ ] Merge PR to main
- [ ] Production deployment triggered
- [ ] Production site updates
- [ ] Lighthouse audit runs (optional)

---

## Post-Deployment

### DNS & Domain (if using custom domain)
- [ ] DNS records configured
- [ ] HTTPS certificate issued
- [ ] www redirect configured
- [ ] Domain propagated (24-48 hours)

### Monitoring Setup
- [ ] Netlify Analytics enabled (optional)
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring set up (optional)
- [ ] Performance monitoring active

### Documentation
- [ ] Deployment URL documented
- [ ] Access credentials stored securely
- [ ] Team members notified
- [ ] Deployment guide shared

---

## Security Checklist

### Headers
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CSP policy active
- [ ] HSTS enabled
- [ ] X-Frame-Options set

### Content
- [ ] No API keys in code
- [ ] No sensitive data exposed
- [ ] Environment variables secure
- [ ] Forms have spam protection

---

## Performance Checklist

### Lighthouse Scores
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1

### Optimization
- [ ] Images optimized (WebP/AVIF)
- [ ] Code splitting enabled
- [ ] Caching configured
- [ ] Compression enabled

---

## Maintenance Checklist

### Regular Tasks
- [ ] Monitor deployment logs weekly
- [ ] Check error rates monthly
- [ ] Update dependencies monthly
- [ ] Review performance metrics
- [ ] Test all functionality quarterly

### Updates
- [ ] Content updates via Git push
- [ ] Dependency updates tested locally
- [ ] Breaking changes documented
- [ ] Rollback plan documented

---

## Troubleshooting

### If Build Fails
- [ ] Check build logs in Netlify
- [ ] Verify Node version (20)
- [ ] Check for missing dependencies
- [ ] Test build locally
- [ ] Clear Netlify cache and retry

### If Site Not Loading
- [ ] Check deployment status
- [ ] Verify DNS settings
- [ ] Check browser console for errors
- [ ] Test in incognito mode
- [ ] Clear browser cache

### If CI/CD Fails
- [ ] Check GitHub Actions logs
- [ ] Verify secrets are set
- [ ] Check token expiration
- [ ] Verify workflow syntax
- [ ] Test locally first

---

## Success Criteria

✅ **Deployment Successful When:**

- Site loads at production URL
- All pages accessible and functional
- No console errors
- Performance scores >90
- Mobile responsive
- Forms work correctly
- Downloads work
- CI/CD pipeline green
- Team can access and update

---

## Emergency Rollback

**If something goes wrong:**

1. **Via Netlify Dashboard:**
   - Go to Deploys tab
   - Find last working deployment
   - Click "Publish deploy"

2. **Via Git:**
   ```bash
   git revert HEAD
   git push origin main
   ```

3. **Via Netlify CLI:**
   ```bash
   netlify rollback
   ```

---

## Support Contacts

- **Netlify Support:** https://www.netlify.com/support/
- **GitHub Support:** https://support.github.com/
- **Project Issues:** Create issue in GitHub repository

---

## Notes

**Deployment Date:** _________________

**Deployed By:** _________________

**Production URL:** _________________

**Issues Encountered:** _________________

**Resolution:** _________________

---

**Status:** Ready for deployment! 🚀

Use this checklist for every deployment to ensure consistency and quality.
