# 🚀 Quick Start: Deploy to Netlify

Get your portfolio live in 5 minutes!

## Option 1: Automated Deployment (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Choose your repository
4. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20`
5. Click "Deploy site"

### Step 3: Configure GitHub Secrets

1. Go to GitHub repo → Settings → Secrets → Actions
2. Add secrets:
   - `NETLIFY_AUTH_TOKEN`: Get from Netlify → User Settings → Applications → New access token
   - `NETLIFY_SITE_ID`: Get from Netlify → Site settings → API ID

✅ **Done!** Every push to `main` now auto-deploys.

---

## Option 2: Manual Deployment

### Using Deployment Script (Windows)

```powershell
# Run PowerShell script
.\scripts\deploy-to-netlify.ps1
```

### Using Deployment Script (Mac/Linux)

```bash
# Make script executable
chmod +x scripts/deploy-to-netlify.sh

# Run script
./scripts/deploy-to-netlify.sh
```

### Using Netlify CLI Directly

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Verify Deployment

After deployment, check:

1. **Site URL:** Visit your Netlify URL
2. **All pages work:** Test navigation
3. **Forms work:** Test contact form
4. **Downloads work:** Test CV download
5. **Mobile responsive:** Check on phone

---

## CI/CD Pipeline

The GitHub Actions workflow automatically:

✅ Runs tests on every push  
✅ Builds the project  
✅ Deploys to Netlify  
✅ Creates preview for PRs  
✅ Runs performance audits  

**View pipeline:** GitHub repo → Actions tab

---

## Troubleshooting

### Build fails?
```bash
# Test locally first
npm install --legacy-peer-deps
npm run build
```

### Deployment fails?
- Check GitHub secrets are set
- Verify Netlify token is valid
- Check build logs in Netlify dashboard

### Site not updating?
- Clear Netlify cache: Site settings → Build & deploy → Clear cache
- Trigger manual deploy: Deploys → Trigger deploy

---

## Quick Commands

```bash
# Check deployment status
netlify status

# Open site in browser
netlify open

# Open Netlify dashboard
netlify open:admin

# View logs
netlify logs

# Rollback deployment
# Go to Netlify dashboard → Deploys → Click on previous deploy → Publish deploy
```

---

## Next Steps

1. ✅ Deploy site
2. ✅ Test all functionality
3. ✅ Set up custom domain (optional)
4. ✅ Enable analytics
5. ✅ Monitor performance

---

## Support

- **Full Guide:** See `NETLIFY_DEPLOYMENT_GUIDE.md`
- **Issues:** Create issue in GitHub repo
- **Netlify Docs:** https://docs.netlify.com/

---

**Ready to deploy?** Choose an option above and get started! 🎉
