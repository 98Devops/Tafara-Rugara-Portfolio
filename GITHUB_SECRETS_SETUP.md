# 🔐 GitHub Secrets Setup Guide

Complete step-by-step guide to add GitHub Secrets for automated Netlify deployments.

## What Are GitHub Secrets?

GitHub Secrets are encrypted environment variables that allow GitHub Actions to securely access your Netlify account and deploy your site automatically. You need two secrets:

1. **NETLIFY_AUTH_TOKEN** - Allows GitHub to authenticate with Netlify
2. **NETLIFY_SITE_ID** - Tells GitHub which Netlify site to deploy to

---

## Step 1: Get Your Netlify Auth Token

### Option A: Via Netlify Dashboard (Recommended)

1. **Log in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - You should already be logged in

2. **Navigate to User Settings**
   - Click your profile picture/avatar in the top right corner
   - Click **"User settings"** from the dropdown menu

3. **Go to Applications**
   - In the left sidebar, scroll down to find **"Applications"**
   - Click on **"Applications"**

4. **Create New Access Token**
   - Scroll down to the **"Personal access tokens"** section
   - Click the **"New access token"** button
   
5. **Name Your Token**
   - Description: `GitHub Actions - Portfolio Deployment`
   - Click **"Generate token"**

6. **Copy the Token**
   - ⚠️ **IMPORTANT:** Copy the token immediately!
   - It looks like: `nfp_ABC123xyz...` (long string of characters)
   - You won't be able to see it again
   - Save it temporarily in a text file (you'll delete this after adding to GitHub)

**Screenshot locations:**
```
Netlify Dashboard → Profile Picture → User settings → Applications → Personal access tokens → New access token
```

---

## Step 2: Get Your Netlify Site ID

### Since You Already Have a Site Connected:

1. **Go to Your Site Dashboard**
   - In Netlify, click on your site name from the main dashboard
   - Or go to: Sites → [Your Site Name]

2. **Open Site Settings**
   - Click **"Site settings"** button (usually in the top navigation)

3. **Find Site Information**
   - Look for **"Site details"** or **"Site information"** section
   - You should see **"API ID"** or **"Site ID"**

4. **Copy the Site ID**
   - It looks like: `abc12345-6789-def0-1234-56789abcdef0` (UUID format)
   - Copy this ID
   - Save it temporarily in a text file

**Screenshot locations:**
```
Netlify Dashboard → Your Site → Site settings → Site details → API ID
```

### Alternative Method (If You Can't Find It):

1. Look at your site URL in Netlify
2. The Site ID is in the URL: `app.netlify.com/sites/YOUR-SITE-NAME/...`
3. Or check the site settings URL bar

---

## Step 3: Add Secrets to GitHub

Now that you have both values, let's add them to GitHub:

### 3.1 Navigate to Your GitHub Repository

1. **Go to GitHub**
   - Open [github.com](https://github.com)
   - Navigate to your `tafara-portfolio` repository

2. **Open Repository Settings**
   - Click the **"Settings"** tab (top right of repository page)
   - ⚠️ Note: This is repository settings, NOT your profile settings

### 3.2 Navigate to Secrets Section

1. **Find Secrets and Variables**
   - In the left sidebar, scroll down to **"Security"** section
   - Click **"Secrets and variables"**
   - Click **"Actions"** from the dropdown

**Path:**
```
Repository → Settings → Secrets and variables → Actions
```

### 3.3 Add NETLIFY_AUTH_TOKEN

1. **Click "New repository secret"** (green button on the right)

2. **Fill in the form:**
   - **Name:** `NETLIFY_AUTH_TOKEN` (must be exactly this, all caps)
   - **Secret:** Paste the token you copied from Netlify (starts with `nfp_`)

3. **Click "Add secret"** (green button at bottom)

4. **Verify:** You should see `NETLIFY_AUTH_TOKEN` in the list with a green checkmark

### 3.4 Add NETLIFY_SITE_ID

1. **Click "New repository secret"** again

2. **Fill in the form:**
   - **Name:** `NETLIFY_SITE_ID` (must be exactly this, all caps)
   - **Secret:** Paste the Site ID you copied (UUID format)

3. **Click "Add secret"**

4. **Verify:** You should now see both secrets:
   - ✅ `NETLIFY_AUTH_TOKEN`
   - ✅ `NETLIFY_SITE_ID`

---

## Step 4: Verify Setup

### Check Secrets Are Added

1. Go to your repository → Settings → Secrets and variables → Actions
2. You should see:
   ```
   NETLIFY_AUTH_TOKEN    Updated X seconds ago
   NETLIFY_SITE_ID       Updated X seconds ago
   ```

### Test the CI/CD Pipeline

1. **Make a small change to your code:**
   ```bash
   # In your project directory
   cd tafara-portfolio
   
   # Make a small change (e.g., update README)
   echo "# Test deployment" >> README.md
   
   # Commit and push
   git add .
   git commit -m "Test: Verify CI/CD pipeline"
   git push origin main
   ```

2. **Watch the GitHub Actions workflow:**
   - Go to your repository on GitHub
   - Click the **"Actions"** tab
   - You should see a new workflow running
   - Click on it to see the progress

3. **Check for successful deployment:**
   - Wait for all jobs to complete (2-5 minutes)
   - All jobs should have green checkmarks ✅
   - The "Deploy to Netlify" job should succeed

4. **Verify on Netlify:**
   - Go to your Netlify dashboard
   - Check the "Deploys" tab
   - You should see a new deployment from GitHub Actions

---

## Troubleshooting

### Error: "NETLIFY_AUTH_TOKEN not found"

**Solution:**
1. Go back to GitHub → Settings → Secrets and variables → Actions
2. Verify the secret name is exactly: `NETLIFY_AUTH_TOKEN` (all caps, no spaces)
3. If misspelled, delete it and add again with correct name

### Error: "NETLIFY_SITE_ID not found"

**Solution:**
1. Verify the secret name is exactly: `NETLIFY_SITE_ID` (all caps, no spaces)
2. Check you copied the full UUID (should be 36 characters with dashes)

### Error: "Unauthorized" or "Invalid token"

**Solution:**
1. Your token might be expired or incorrect
2. Generate a new token in Netlify:
   - User settings → Applications → Personal access tokens
   - Delete old token
   - Create new token
   - Update the secret in GitHub

### Error: "Site not found"

**Solution:**
1. Verify your Site ID is correct
2. In Netlify, go to: Site settings → Site details → Copy API ID
3. Update the `NETLIFY_SITE_ID` secret in GitHub

### Workflow Not Triggering

**Solution:**
1. Check the workflow file exists: `.github/workflows/ci.yml`
2. Verify you pushed to the `main` branch
3. Check GitHub Actions is enabled: Settings → Actions → General → Allow all actions

---

## Visual Guide

### Finding Netlify Auth Token:

```
1. Netlify Dashboard (app.netlify.com)
   ↓
2. Click Profile Picture (top right)
   ↓
3. User settings
   ↓
4. Applications (left sidebar)
   ↓
5. Personal access tokens
   ↓
6. New access token
   ↓
7. Copy token (starts with nfp_)
```

### Finding Netlify Site ID:

```
1. Netlify Dashboard
   ↓
2. Click Your Site
   ↓
3. Site settings
   ↓
4. Site details
   ↓
5. Copy API ID (UUID format)
```

### Adding to GitHub:

```
1. GitHub Repository
   ↓
2. Settings tab
   ↓
3. Secrets and variables (left sidebar)
   ↓
4. Actions
   ↓
5. New repository secret
   ↓
6. Add NETLIFY_AUTH_TOKEN
   ↓
7. Add NETLIFY_SITE_ID
```

---

## Security Best Practices

### ✅ Do:
- Keep tokens secret (never commit to code)
- Use descriptive token names in Netlify
- Regenerate tokens if compromised
- Delete unused tokens

### ❌ Don't:
- Share tokens publicly
- Commit tokens to Git
- Use the same token for multiple projects
- Store tokens in plain text files (delete after adding to GitHub)

---

## Quick Reference

### Secret Names (Must Be Exact):
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

### Where to Find Values:

| Secret | Where to Get It | Format |
|--------|----------------|--------|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Applications → New token | `nfp_ABC123...` |
| `NETLIFY_SITE_ID` | Netlify → Site settings → Site details → API ID | `abc12345-6789-...` |

### Where to Add Them:
```
GitHub Repository → Settings → Secrets and variables → Actions → New repository secret
```

---

## After Setup

Once secrets are added:

1. ✅ Every push to `main` automatically deploys to production
2. ✅ Every pull request creates a preview deployment
3. ✅ GitHub Actions runs tests before deploying
4. ✅ Deployment status shows in GitHub

### Next Steps:

1. Push code to trigger first automated deployment
2. Check GitHub Actions tab to see workflow
3. Verify deployment in Netlify dashboard
4. Your site is live! 🎉

---

## Need Help?

**Can't find something?**
- Take screenshots and check against this guide
- Netlify UI might look slightly different but sections are the same
- Look for keywords: "Applications", "Personal access tokens", "API ID"

**Still stuck?**
- Check Netlify documentation: https://docs.netlify.com/
- GitHub Secrets docs: https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

## Summary Checklist

- [ ] Logged into Netlify
- [ ] Generated Personal Access Token
- [ ] Copied token (starts with `nfp_`)
- [ ] Found Site ID (UUID format)
- [ ] Opened GitHub repository settings
- [ ] Navigated to Secrets and variables → Actions
- [ ] Added `NETLIFY_AUTH_TOKEN` secret
- [ ] Added `NETLIFY_SITE_ID` secret
- [ ] Verified both secrets appear in list
- [ ] Pushed code to test deployment
- [ ] Checked GitHub Actions workflow
- [ ] Verified deployment in Netlify

**Status:** Ready for automated deployments! 🚀
