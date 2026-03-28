# 🔄 Swap Netlify Account - Complete Guide

Your current Netlify account is suspended (exceeded 300 credits). Here's how to switch to a new account and get CI/CD working.

---

## 📋 Overview

**What we'll do:**
1. Create new Netlify account
2. Import your GitHub repo to new account
3. Get new credentials (Auth Token + Site ID)
4. Update GitHub Secrets
5. Trigger deployment
6. Verify everything works

**Time needed:** 10-15 minutes

---

## Step 1: Create New Netlify Account

### Option A: Use Different Email
1. Go to https://app.netlify.com
2. Click "Sign up"
3. Use a different email address
4. Or sign up with GitHub (different account)

### Option B: Use Same Email (After Cleanup)
1. Log into old Netlify account
2. Delete all sites
3. Wait for billing cycle to reset (April 16)
4. Or upgrade to paid plan

**Recommended:** Use Option A (new email) for immediate deployment.

---

## Step 2: Import GitHub Repository to New Netlify

1. **Log into new Netlify account**
   - Go to https://app.netlify.com

2. **Import from GitHub**
   - Click "Add new site"
   - Click "Import an existing project"
   - Click "GitHub"
   - Authorize Netlify (if first time)

3. **Select Repository**
   - Find and click: `Tafara-Rugara-Portfolio`

4. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

5. **Deploy Site**
   - Click "Deploy site"
   - Wait 2-3 minutes for first build
   - Site will get a random URL like: `random-name-123.netlify.app`

---

## Step 3: Get New Netlify Credentials

### 3.1 Get Auth Token

1. **In new Netlify account:**
   - Click your profile picture (top right)
   - Click "User settings"
   - Click "Applications" (left sidebar)
   - Scroll to "Personal access tokens"

2. **Create Token:**
   - Click "New access token"
   - Description: `GitHub Actions - Portfolio`
   - Click "Generate token"

3. **Copy Token:**
   - Copy the ENTIRE token (starts with `nfp_`)
   - Save temporarily in a text file
   - ⚠️ Make sure NO extra spaces or newlines!

### 3.2 Get Site ID

1. **Go to your new site:**
   - In Netlify dashboard, click your site name

2. **Open Site Settings:**
   - Click "Site settings" button

3. **Find API ID:**
   - Under "Site details" section
   - Look for "API ID" or "Site ID"
   - Copy the UUID (format: `abc12345-6789-def0-1234-56789abcdef0`)
   - Save temporarily in text file

---

## Step 4: Update GitHub Secrets

### 4.1 Delete Old Secrets

1. Go to: https://github.com/98Devops/Tafara-Rugara-Portfolio/settings/secrets/actions

2. Delete old secrets:
   - Click on `NETLIFY_AUTH_TOKEN` → Remove secret
   - Click on `NETLIFY_SITE_ID` → Remove secret

### 4.2 Add New Secrets

1. **Add NETLIFY_AUTH_TOKEN:**
   - Click "New repository secret"
   - Name: `NETLIFY_AUTH_TOKEN` (exactly, all caps)
   - Value: Paste your NEW token from Step 3.1
   - ⚠️ Triple-check: No spaces before/after!
   - Click "Add secret"

2. **Add NETLIFY_SITE_ID:**
   - Click "New repository secret"
   - Name: `NETLIFY_SITE_ID` (exactly, all caps)
   - Value: Paste your NEW Site ID from Step 3.2
   - ⚠️ Triple-check: No spaces before/after!
   - Click "Add secret"

3. **Verify:**
   - You should see both secrets listed:
     - ✅ NETLIFY_AUTH_TOKEN (Updated just now)
     - ✅ NETLIFY_SITE_ID (Updated just now)

---

## Step 5: Trigger Deployment

### 5.1 Push a Test Commit

```bash
cd "C:\Users\Lenovo\Tafara Website\tafara-portfolio"

# Create empty commit to trigger deployment
git commit --allow-empty -m "Deploy: Switch to new Netlify account"

# Push to GitHub
git push origin main
```

### 5.2 Watch GitHub Actions

1. Go to: https://github.com/98Devops/Tafara-Rugara-Portfolio/actions

2. Click on the latest workflow run

3. Watch the jobs:
   - 🟡 test (will run, may fail - that's OK, it's optional)
   - 🟡 e2e-tests (will run, may fail - that's OK, it's optional)
   - 🟡 lighthouse (will run, may fail - that's OK, it's optional)
   - 🟢 build-and-deploy (THIS MUST SUCCEED!)

4. Wait 3-5 minutes for completion

---

## Step 6: Verify Deployment

### 6.1 Check GitHub Actions

- All jobs should complete (green or yellow)
- "build-and-deploy" job MUST be green ✅
- If it fails, check the error logs

### 6.2 Check Netlify Dashboard

1. Go to your new Netlify account
2. Click on your site
3. Click "Deploys" tab
4. You should see:
   - New deployment from GitHub Actions
   - Status: "Published" with green checkmark
   - Deploy time: Just now

### 6.3 Test Your Live Site

1. **Get your site URL:**
   - In Netlify dashboard, copy the site URL
   - Format: `https://random-name-123.netlify.app`

2. **Test all pages:**
   - ✅ Home page loads
   - ✅ Contact page loads
   - ✅ Projects page loads
   - ✅ Experience page loads
   - ✅ What I Do page loads
   - ✅ Navigation works
   - ✅ Contact form works
   - ✅ CV download works

3. **Test on mobile:**
   - Open site on your phone
   - Check responsiveness

---

## Step 7: Optional - Custom Domain

If you want a custom domain (e.g., `tafaraugara.com`):

1. **In Netlify:**
   - Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain
   - Follow DNS setup instructions

2. **Update DNS:**
   - Add Netlify's nameservers to your domain registrar
   - Or add A/CNAME records

3. **Enable HTTPS:**
   - Netlify automatically provisions SSL certificate
   - Takes 5-10 minutes

---

## 🎯 Quick Checklist

Use this checklist as you go:

- [ ] Created new Netlify account
- [ ] Imported GitHub repo to new Netlify
- [ ] Site deployed successfully on Netlify
- [ ] Copied new Auth Token (starts with `nfp_`)
- [ ] Copied new Site ID (UUID format)
- [ ] Deleted old GitHub secrets
- [ ] Added new NETLIFY_AUTH_TOKEN to GitHub
- [ ] Added new NETLIFY_SITE_ID to GitHub
- [ ] Verified both secrets are in GitHub
- [ ] Pushed test commit to trigger deployment
- [ ] Watched GitHub Actions workflow complete
- [ ] Verified "build-and-deploy" job succeeded
- [ ] Checked Netlify shows new deployment
- [ ] Tested live site - all pages work
- [ ] Tested on mobile device

---

## 🔧 Troubleshooting

### "HTTP header value" error again

**Cause:** Extra spaces or newlines in secrets

**Fix:**
1. Copy token/ID to Notepad first
2. Remove any spaces/newlines
3. Copy from Notepad to GitHub
4. Make sure it's one continuous string

### "NETLIFY_AUTH_TOKEN not found"

**Cause:** Secret name is wrong

**Fix:**
1. Check spelling: `NETLIFY_AUTH_TOKEN` (all caps, underscores)
2. Delete and re-add with exact name

### "Site not found" or "Unauthorized"

**Cause:** Wrong Site ID or expired token

**Fix:**
1. Verify Site ID is from NEW Netlify account
2. Generate fresh token
3. Update both secrets

### Build succeeds but site doesn't update

**Cause:** Deploying to old (suspended) account

**Fix:**
1. Verify Site ID is from NEW account
2. Check Netlify dashboard shows new deployment
3. Clear browser cache (Ctrl+Shift+R)

### Deployment takes too long

**Cause:** Large node_modules or slow build

**Fix:**
1. Check GitHub Actions logs for bottlenecks
2. Netlify free tier has build time limits
3. Consider optimizing build process

---

## 📊 What Happens After Setup

Once configured, every time you push to `main`:

1. ✅ GitHub Actions runs automatically
2. ✅ Tests run (optional, won't block deployment)
3. ✅ Build is created
4. ✅ Site deploys to Netlify
5. ✅ You get notification when done
6. ✅ Site is live within 3-5 minutes

**No manual deployment needed!**

---

## 💡 Pro Tips

### Avoid Credit Overages

Netlify free tier includes:
- 300 build minutes/month
- 100 GB bandwidth/month

To stay within limits:
- Don't push too frequently (batch commits)
- Optimize build time (currently ~2-3 minutes)
- Use caching effectively

### Monitor Usage

1. Netlify dashboard → Team settings
2. Click "Billing"
3. Check "Usage" tab
4. Monitor build minutes and bandwidth

### Optimize Builds

Current build time: ~2-3 minutes

To reduce:
- Use npm ci instead of npm install (already doing)
- Cache node_modules (already configured)
- Skip optional jobs when not needed

---

## 🎉 Success Criteria

You'll know it's working when:

1. ✅ GitHub Actions shows green checkmark
2. ✅ Netlify shows "Published" status
3. ✅ Site URL loads your portfolio
4. ✅ All pages display correctly
5. ✅ Future pushes auto-deploy

---

## 📞 Need Help?

If you get stuck:

1. Check the error message in GitHub Actions logs
2. Check Netlify deploy logs
3. Verify secrets are correct (no typos)
4. Make sure Site ID is from NEW account
5. Try regenerating token if auth fails

---

## 🔗 Important Links

- **GitHub Repo:** https://github.com/98Devops/Tafara-Rugara-Portfolio
- **GitHub Actions:** https://github.com/98Devops/Tafara-Rugara-Portfolio/actions
- **GitHub Secrets:** https://github.com/98Devops/Tafara-Rugara-Portfolio/settings/secrets/actions
- **New Netlify:** https://app.netlify.com (your new account)

---

**Ready to start?** Follow Step 1 and work through each step in order! 🚀
