# 🚀 Deployment Steps - Complete Guide

Follow these steps in order to deploy your portfolio to Netlify with automated CI/CD.

---

## ✅ STEP 1: Verify Local Build Works

Before deploying, make sure everything builds correctly locally.

```powershell
# Stop the dev server (Ctrl+C in the terminal running npm run dev)

# Test production build
npm run build

# If build succeeds, you'll see:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

**Expected Result:** Build completes without errors.

**If build fails:** Fix any errors before proceeding.

---

## ✅ STEP 2: Commit and Push to GitHub

Make sure all your changes are committed and pushed.

```powershell
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Ready for Netlify deployment"

# Push to GitHub
git push origin main
```

**Expected Result:** All changes pushed to GitHub successfully.

**Verify:** Go to your GitHub repository and confirm the latest commit is there.

---

## ✅ STEP 3: Get Netlify Auth Token

1. **Open Netlify Dashboard**
   - Go to https://app.netlify.com
   - Log in (you mentioned you're already logged in)

2. **Navigate to User Settings**
   - Click your **profile picture** (top right corner)
   - Click **"User settings"**

3. **Go to Applications**
   - In the left sidebar, scroll down
   - Click **"Applications"**

4. **Create Personal Access Token**
   - Scroll to **"Personal access tokens"** section
   - Click **"New access token"** button
   - Description: `GitHub Actions - Portfolio Deployment`
   - Click **"Generate token"**

5. **Copy the Token**
   - ⚠️ **IMPORTANT:** Copy it immediately!
   - It starts with `nfp_`
   - Save it in a text file temporarily (you'll delete this later)

**Expected Result:** You have a token that looks like `nfp_ABC123xyz...`

---

## ✅ STEP 4: Get Netlify Site ID

### Option A: If You Already Have a Site

1. **Go to Your Site in Netlify**
   - Click on your site name from the dashboard

2. **Open Site Settings**
   - Click **"Site settings"** button

3. **Find API ID**
   - Look for **"Site details"** or **"Site information"** section
   - Find **"API ID"** or **"Site ID"**
   - Copy it (looks like: `abc12345-6789-def0-1234-56789abcdef0`)

### Option B: If You Need to Create a New Site

1. **Import from GitHub**
   - In Netlify dashboard, click **"Add new site"**
   - Click **"Import an existing project"**
   - Select **"GitHub"**
   - Choose your `tafara-portfolio` repository

2. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** Leave default or set to `20`
   - Click **"Deploy site"**

3. **Get Site ID**
   - After site is created, go to **Site settings**
   - Find **"API ID"** in **"Site details"**
   - Copy it

**Expected Result:** You have a Site ID (UUID format with dashes)

---

## ✅ STEP 5: Add GitHub Secrets

Now add both values to GitHub.

1. **Open Your GitHub Repository**
   - Go to https://github.com
   - Navigate to your `tafara-portfolio` repository

2. **Go to Settings**
   - Click the **"Settings"** tab (top right of repo page)
   - ⚠️ This is REPOSITORY settings, not your profile

3. **Navigate to Secrets**
   - In left sidebar, find **"Security"** section
   - Click **"Secrets and variables"**
   - Click **"Actions"**

4. **Add First Secret: NETLIFY_AUTH_TOKEN**
   - Click **"New repository secret"** (green button)
   - **Name:** `NETLIFY_AUTH_TOKEN` (exactly, all caps)
   - **Secret:** Paste your token from Step 3
   - Click **"Add secret"**

5. **Add Second Secret: NETLIFY_SITE_ID**
   - Click **"New repository secret"** again
   - **Name:** `NETLIFY_SITE_ID` (exactly, all caps)
   - **Secret:** Paste your Site ID from Step 4
   - Click **"Add secret"**

6. **Verify Both Secrets**
   - You should see both secrets listed:
     - ✅ `NETLIFY_AUTH_TOKEN`
     - ✅ `NETLIFY_SITE_ID`

**Expected Result:** Both secrets are visible in the list.

---

## ✅ STEP 6: Trigger Deployment

Now push a change to trigger the automated deployment.

```powershell
# Make a small change (or just trigger a new commit)
echo "# Deployment test" >> README.md

# Commit and push
git add .
git commit -m "Trigger automated deployment"
git push origin main
```

**Expected Result:** Push completes successfully.

---

## ✅ STEP 7: Watch GitHub Actions

Monitor the deployment pipeline.

1. **Go to GitHub Actions**
   - In your GitHub repository
   - Click the **"Actions"** tab (top navigation)

2. **Watch the Workflow**
   - You'll see a new workflow running: **"CI/CD Pipeline"**
   - Click on it to see details

3. **Monitor Progress**
   - You'll see these jobs running:
     - 🟡 Lint & Type Check
     - 🟡 Unit Tests
     - 🟡 Build Test
     - 🟡 Deploy to Netlify
   
4. **Wait for Completion**
   - Takes about 3-5 minutes
   - All jobs should turn green ✅

**Expected Result:** All jobs complete with green checkmarks.

**If any job fails:**
- Click on the failed job to see error details
- Fix the issue and push again

---

## ✅ STEP 8: Verify Deployment on Netlify

Check that your site is live.

1. **Go to Netlify Dashboard**
   - Open https://app.netlify.com
   - Click on your site

2. **Check Deploys Tab**
   - Click **"Deploys"** in the top navigation
   - You should see a new deployment from GitHub Actions
   - Status should be **"Published"** with a green checkmark

3. **Open Your Live Site**
   - Click on the site URL (e.g., `https://your-site.netlify.app`)
   - Or click **"Open production deploy"**

4. **Test All Pages**
   - ✅ Home page loads
   - ✅ Contact page loads
   - ✅ Projects page loads
   - ✅ Experience page loads
   - ✅ What I Do page loads
   - ✅ Navigation works
   - ✅ Contact form works
   - ✅ CV download works

**Expected Result:** Your site is live and fully functional!

---

## ✅ STEP 9: Test Automated Deployments

Verify that future pushes automatically deploy.

```powershell
# Make a small change
# (Edit any file, like updating your portfolio data)

# Commit and push
git add .
git commit -m "Test: Automated deployment"
git push origin main
```

**Expected Result:**
- GitHub Actions automatically runs
- Site automatically deploys to Netlify
- Changes appear on your live site within 3-5 minutes

---

## 🎉 SUCCESS CHECKLIST

- [ ] Local build works (`npm run build`)
- [ ] Code pushed to GitHub
- [ ] Netlify Auth Token obtained
- [ ] Netlify Site ID obtained
- [ ] GitHub Secrets added (both)
- [ ] First deployment triggered
- [ ] GitHub Actions workflow completed successfully
- [ ] Site is live on Netlify
- [ ] All pages work correctly
- [ ] Automated deployments work

---

## 🔧 Troubleshooting

### Build Fails in GitHub Actions

**Check the error logs:**
1. Go to GitHub → Actions → Click failed workflow
2. Click on the failed job
3. Read the error message
4. Fix the issue locally
5. Push again

### Deployment Fails

**Common issues:**

1. **"NETLIFY_AUTH_TOKEN not found"**
   - Check secret name is exactly: `NETLIFY_AUTH_TOKEN`
   - Regenerate token if needed

2. **"NETLIFY_SITE_ID not found"**
   - Check secret name is exactly: `NETLIFY_SITE_ID`
   - Verify Site ID is correct

3. **"Unauthorized"**
   - Token might be expired
   - Generate new token in Netlify
   - Update GitHub secret

### Site Not Updating

1. **Clear Netlify cache:**
   - Netlify dashboard → Site settings
   - Build & deploy → Clear cache and deploy site

2. **Check deployment status:**
   - Netlify dashboard → Deploys
   - Look for errors in deploy log

3. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

---

## 📝 What Happens on Every Push

Once set up, every time you push to `main`:

1. ✅ GitHub Actions runs automatically
2. ✅ Code is linted and type-checked
3. ✅ Tests run
4. ✅ Production build is created
5. ✅ Site deploys to Netlify
6. ✅ You get a notification when done

**No manual deployment needed!**

---

## 🔗 Quick Links

- **GitHub Secrets Setup:** See `GITHUB_SECRETS_SETUP.md`
- **Visual Guide:** See `SECRETS_VISUAL_GUIDE.md`
- **Deployment Config:** See `netlify.toml`
- **CI/CD Pipeline:** See `.github/workflows/ci.yml`

---

## 📞 Need Help?

If you get stuck:

1. Check the error message carefully
2. Review the troubleshooting section above
3. Check GitHub Actions logs for details
4. Check Netlify deploy logs
5. Verify all secrets are set correctly

---

**Ready to deploy? Start with Step 1!** 🚀
