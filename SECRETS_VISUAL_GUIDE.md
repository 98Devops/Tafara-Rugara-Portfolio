# 🎨 Visual Guide: GitHub Secrets Setup

A picture-perfect guide with exact steps and what you'll see.

---

## 🔑 Part 1: Get Netlify Auth Token

### Step 1: Open Netlify User Settings

```
┌─────────────────────────────────────────────────────────┐
│  Netlify Dashboard                                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [Your Profile Picture] ▼                        │  │
│  │    ┌──────────────────────┐                      │  │
│  │    │ User settings        │ ← Click this         │  │
│  │    │ Team settings        │                      │  │
│  │    │ Log out              │                      │  │
│  │    └──────────────────────┘                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Your profile picture or avatar in the top right corner
- Click it to see a dropdown menu
- Select "User settings"

---

### Step 2: Navigate to Applications

```
┌─────────────────────────────────────────────────────────┐
│  User Settings                                          │
│  ┌──────────────┐  ┌────────────────────────────────┐  │
│  │ Left Sidebar │  │ Main Content Area              │  │
│  │              │  │                                │  │
│  │ Profile      │  │                                │  │
│  │ Account      │  │                                │  │
│  │ Billing      │  │                                │  │
│  │ ...          │  │                                │  │
│  │ Applications │←─┤ Click this in sidebar         │  │
│  │ ...          │  │                                │  │
│  └──────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Left sidebar with various settings options
- Scroll down to find "Applications"
- Click on "Applications"

---

### Step 3: Create Personal Access Token

```
┌─────────────────────────────────────────────────────────┐
│  Applications                                           │
│                                                         │
│  Personal access tokens                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Tokens allow external services to access your     │ │
│  │ Netlify account.                                  │ │
│  │                                                   │ │
│  │ [New access token] ← Click this button           │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Existing tokens:                                      │
│  (You might see some here or it might be empty)       │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Section titled "Personal access tokens"
- Green button "New access token"
- Click the button

---

### Step 4: Name and Generate Token

```
┌─────────────────────────────────────────────────────────┐
│  New access token                                       │
│                                                         │
│  Description                                           │
│  ┌───────────────────────────────────────────────────┐ │
│  │ GitHub Actions - Portfolio Deployment            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [Generate token] ← Click this                         │
└─────────────────────────────────────────────────────────┘
```

**What to do:**
1. Enter description: `GitHub Actions - Portfolio Deployment`
2. Click "Generate token"

---

### Step 5: Copy Your Token

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️  IMPORTANT: Copy this token now!                    │
│  You won't be able to see it again.                    │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ nfp_ABC123xyz789...                    [Copy]    │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ✅ Token created successfully                          │
└─────────────────────────────────────────────────────────┘
```

**What to do:**
1. Click the "Copy" button or select and copy the token
2. Token starts with `nfp_`
3. Paste it in a temporary text file
4. ⚠️ You won't see this token again!

---

## 🆔 Part 2: Get Netlify Site ID

### Step 1: Go to Your Site

```
┌─────────────────────────────────────────────────────────┐
│  Netlify Dashboard                                      │
│                                                         │
│  Sites                                                 │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ┌─────────────────────────────────────────────┐   │ │
│  │ │ tafara-portfolio                            │   │ │
│  │ │ https://your-site.netlify.app               │   │ │
│  │ │ Published 2 hours ago                       │   │ │
│  │ └─────────────────────────────────────────────┘   │ │
│  │     ↑ Click on your site name                     │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- List of your sites
- Find your portfolio site
- Click on the site name

---

### Step 2: Open Site Settings

```
┌─────────────────────────────────────────────────────────┐
│  tafara-portfolio                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [Site settings] ← Click this button              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Production: main@HEAD                                 │
│  https://your-site.netlify.app                         │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Your site overview page
- Button labeled "Site settings" in the top navigation
- Click "Site settings"

---

### Step 3: Find API ID

```
┌─────────────────────────────────────────────────────────┐
│  Site settings                                          │
│                                                         │
│  General                                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Site details                                      │ │
│  │                                                   │ │
│  │ Site name: tafara-portfolio                       │ │
│  │                                                   │ │
│  │ API ID: abc12345-6789-def0-1234-56789abcdef0     │ │
│  │         ↑ Copy this (it's your Site ID)          │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- "Site details" section
- "API ID" field with a UUID (long string with dashes)
- Copy this entire ID

**Format:** `abc12345-6789-def0-1234-56789abcdef0`

---

## 🔐 Part 3: Add Secrets to GitHub

### Step 1: Open Repository Settings

```
┌─────────────────────────────────────────────────────────┐
│  GitHub - your-username/tafara-portfolio                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Code  Issues  Pull requests  Actions  Settings  │  │
│  │                                         ↑        │  │
│  │                                    Click this    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Repository navigation tabs at the top
- "Settings" tab on the far right
- Click "Settings"

⚠️ **Note:** This is REPOSITORY settings, not your profile settings!

---

### Step 2: Navigate to Secrets

```
┌─────────────────────────────────────────────────────────┐
│  Settings                                               │
│  ┌──────────────┐  ┌────────────────────────────────┐  │
│  │ Left Sidebar │  │ Main Content                   │  │
│  │              │  │                                │  │
│  │ General      │  │                                │  │
│  │ Access       │  │                                │  │
│  │ ...          │  │                                │  │
│  │ Security ▼   │  │                                │  │
│  │   Secrets    │←─┤ Expand Security section       │  │
│  │   and        │  │ Click "Secrets and variables"  │  │
│  │   variables  │  │                                │  │
│  │     Actions  │←─┤ Then click "Actions"          │  │
│  └──────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Left sidebar with settings categories
- "Security" section (might need to expand)
- "Secrets and variables" option
- Click "Actions" under it

---

### Step 3: Add First Secret (NETLIFY_AUTH_TOKEN)

```
┌─────────────────────────────────────────────────────────┐
│  Actions secrets and variables                          │
│                                                         │
│  Secrets                                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [New repository secret] ← Click this              │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Repository secrets:                                   │
│  (Empty list - you haven't added any yet)             │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Green button "New repository secret"
- Empty list (or existing secrets if you have any)
- Click "New repository secret"

---

### Step 4: Enter Token Details

```
┌─────────────────────────────────────────────────────────┐
│  New secret                                             │
│                                                         │
│  Name *                                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ NETLIFY_AUTH_TOKEN                                │ │
│  └───────────────────────────────────────────────────┘ │
│  ↑ Type exactly: NETLIFY_AUTH_TOKEN (all caps)         │
│                                                         │
│  Secret *                                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │ nfp_ABC123xyz789...                               │ │
│  └───────────────────────────────────────────────────┘ │
│  ↑ Paste your token from Netlify                       │
│                                                         │
│  [Add secret] ← Click this                             │
└─────────────────────────────────────────────────────────┘
```

**What to do:**
1. **Name:** Type `NETLIFY_AUTH_TOKEN` (exactly, all caps)
2. **Secret:** Paste the token you copied from Netlify
3. Click "Add secret"

---

### Step 5: Add Second Secret (NETLIFY_SITE_ID)

```
┌─────────────────────────────────────────────────────────┐
│  Actions secrets and variables                          │
│                                                         │
│  Secrets                                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │ [New repository secret] ← Click again             │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Repository secrets:                                   │
│  ✅ NETLIFY_AUTH_TOKEN    Updated 1 minute ago         │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Your first secret is now in the list
- Click "New repository secret" again

---

### Step 6: Enter Site ID Details

```
┌─────────────────────────────────────────────────────────┐
│  New secret                                             │
│                                                         │
│  Name *                                                │
│  ┌───────────────────────────────────────────────────┐ │
│  │ NETLIFY_SITE_ID                                   │ │
│  └───────────────────────────────────────────────────┘ │
│  ↑ Type exactly: NETLIFY_SITE_ID (all caps)            │
│                                                         │
│  Secret *                                              │
│  ┌───────────────────────────────────────────────────┐ │
│  │ abc12345-6789-def0-1234-56789abcdef0             │ │
│  └───────────────────────────────────────────────────┘ │
│  ↑ Paste your Site ID from Netlify                     │
│                                                         │
│  [Add secret] ← Click this                             │
└─────────────────────────────────────────────────────────┘
```

**What to do:**
1. **Name:** Type `NETLIFY_SITE_ID` (exactly, all caps)
2. **Secret:** Paste the Site ID you copied from Netlify
3. Click "Add secret"

---

### Step 7: Verify Both Secrets

```
┌─────────────────────────────────────────────────────────┐
│  Actions secrets and variables                          │
│                                                         │
│  Repository secrets:                                   │
│  ┌───────────────────────────────────────────────────┐ │
│  │ ✅ NETLIFY_AUTH_TOKEN    Updated 2 minutes ago    │ │
│  │ ✅ NETLIFY_SITE_ID       Updated 1 minute ago     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ✨ Perfect! Both secrets are now configured           │
└─────────────────────────────────────────────────────────┘
```

**What you should see:**
- Two secrets in the list
- ✅ NETLIFY_AUTH_TOKEN
- ✅ NETLIFY_SITE_ID
- Both showing "Updated X minutes ago"

---

## ✅ Verification: Test Your Setup

### Push Code to Trigger Deployment

```bash
# In your terminal
cd tafara-portfolio

# Make a small change
echo "# Deployment test" >> README.md

# Commit and push
git add .
git commit -m "Test: Verify automated deployment"
git push origin main
```

---

### Watch GitHub Actions

```
┌─────────────────────────────────────────────────────────┐
│  GitHub Repository                                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Code  Issues  Pull requests  [Actions]  Settings│  │
│  │                                  ↑                │  │
│  │                            Click this tab         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  All workflows                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 🟡 CI/CD Pipeline                                 │ │
│  │    Test: Verify automated deployment             │ │
│  │    Running... (2 minutes ago)                    │ │
│  │    ↑ Click to see details                        │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**What you'll see:**
- Yellow dot 🟡 = Running
- Green checkmark ✅ = Success
- Red X ❌ = Failed (check logs)

---

### Successful Deployment

```
┌─────────────────────────────────────────────────────────┐
│  CI/CD Pipeline                                         │
│                                                         │
│  ✅ Lint & Type Check         (1m 23s)                 │
│  ✅ Unit Tests                 (2m 15s)                 │
│  ✅ Build Test                 (1m 45s)                 │
│  ✅ Deploy to Netlify          (2m 30s)                 │
│  ✅ Deployment Summary         (5s)                     │
│                                                         │
│  All checks have passed! 🎉                             │
└─────────────────────────────────────────────────────────┘
```

**What success looks like:**
- All jobs have green checkmarks ✅
- "Deploy to Netlify" job completed
- Your site is now live!

---

## 🎯 Quick Checklist

Copy this and check off as you go:

```
□ Logged into Netlify (app.netlify.com)
□ Clicked profile picture → User settings
□ Clicked Applications in sidebar
□ Clicked "New access token"
□ Named it "GitHub Actions - Portfolio Deployment"
□ Clicked "Generate token"
□ Copied token (starts with nfp_)
□ Saved token in temporary text file

□ Went to my site in Netlify
□ Clicked "Site settings"
□ Found "API ID" in Site details
□ Copied Site ID (UUID format)
□ Saved Site ID in temporary text file

□ Opened GitHub repository
□ Clicked "Settings" tab
□ Clicked "Secrets and variables" → "Actions"
□ Clicked "New repository secret"
□ Added NETLIFY_AUTH_TOKEN with token value
□ Clicked "New repository secret" again
□ Added NETLIFY_SITE_ID with Site ID value
□ Verified both secrets appear in list

□ Pushed code to test deployment
□ Checked GitHub Actions tab
□ Saw workflow running/completed
□ All jobs passed with green checkmarks
□ Checked Netlify for new deployment

✅ DONE! Automated deployments are working!
```

---

## 🆘 Common Issues

### "I can't find Applications in Netlify"

**Solution:**
- Make sure you're in **User settings** (not Team settings)
- Scroll down in the left sidebar
- Look for "Applications" under account-related options

### "I can't find API ID"

**Solution:**
- Make sure you clicked on your specific site
- Click "Site settings" button
- Look in the "Site details" or "General" section
- API ID is usually near the top

### "GitHub doesn't show Settings tab"

**Solution:**
- Make sure you're the repository owner
- If it's a forked repo, you need admin access
- Try refreshing the page

### "Secrets added but workflow still fails"

**Solution:**
1. Check secret names are EXACTLY:
   - `NETLIFY_AUTH_TOKEN` (not netlify_auth_token)
   - `NETLIFY_SITE_ID` (not netlify_site_id)
2. Regenerate tokens if they're old
3. Check GitHub Actions logs for specific error

---

**Need more help?** See `GITHUB_SECRETS_SETUP.md` for detailed troubleshooting!
