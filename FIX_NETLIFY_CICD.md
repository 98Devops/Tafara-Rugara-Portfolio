# Fix Netlify CI/CD Pipeline

## Issue
The GitHub Actions workflow is failing with: `Error: *** is not a legal HTTP header value`

## Root Causes
1. ✅ **FIXED**: Wrong publish directory (was `.`, now `.next`)
2. ⚠️ **ACTION NEEDED**: GitHub secrets may contain invalid characters

## Steps to Fix

### 1. Verify GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Check these secrets:

#### NETLIFY_AUTH_TOKEN
- Should be a clean token without spaces, quotes, or special characters
- Get it from: https://app.netlify.com/user/applications#personal-access-tokens
- Format: `nfp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- **Common issues:**
  - Extra spaces at beginning/end
  - Quotes around the token
  - Line breaks in the token

#### NETLIFY_SITE_ID
- Should be a clean site ID without spaces or quotes
- Get it from: Netlify Site Settings → General → Site details → Site ID
- Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (UUID format)
- **Common issues:**
  - Extra spaces
  - Quotes around the ID
  - Wrong value (using site name instead of ID)

### 2. How to Update Secrets

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Click on each secret name
3. Click "Update secret"
4. Paste the value carefully (no extra spaces, no quotes)
5. Click "Update secret"

### 3. Get Fresh Tokens

If the issue persists, generate fresh credentials:

#### New Netlify Auth Token:
1. Go to: https://app.netlify.com/user/applications
2. Click "New access token"
3. Give it a name: "GitHub Actions Deploy"
4. Copy the token immediately (shown only once)
5. Update `NETLIFY_AUTH_TOKEN` in GitHub

#### Verify Netlify Site ID:
1. Go to your Netlify site dashboard
2. Site settings → General → Site details
3. Copy the "Site ID" (not the site name)
4. Update `NETLIFY_SITE_ID` in GitHub

### 4. Test the Fix

After updating secrets:

```bash
# Commit and push the workflow fix
cd tafara-portfolio
git add .github/workflows/ci.yml
git commit -m "fix: correct Netlify publish directory and deployment config"
git push origin main
```

The pipeline should now work!

## What Was Fixed in the Workflow

Changed the publish directory from `.` to `./.next` to match the Next.js build output:

```yaml
# Before (WRONG)
publish-dir: '.'

# After (CORRECT)
publish-dir: './.next'
```

Also disabled commit comments to avoid potential header issues:

```yaml
enable-commit-comment: false
```

## Verification

After pushing, check:
1. GitHub Actions tab → Latest workflow run
2. Look for "Deploy to Netlify" step
3. Should see: "✅ Deploy succeeded"

## Alternative: Use Netlify's Native GitHub Integration

If issues persist, consider using Netlify's built-in GitHub integration instead:

1. Go to Netlify dashboard
2. Site settings → Build & deploy → Continuous deployment
3. Link to GitHub repository
4. Netlify will handle deployments automatically
5. You can then remove the `build-and-deploy` job from the workflow
