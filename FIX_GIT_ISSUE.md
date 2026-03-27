# Fix: Nested Git Repository Issue

## The Problem

You have two Git repositories:
1. **Parent repo:** `C:\Users\Lenovo\Tafara Website\.git`
2. **Portfolio repo:** `C:\Users\Lenovo\Tafara Website\tafara-portfolio\.git`

Git is warning you because you're trying to add a Git repo inside another Git repo.

## The Solution

You should work ONLY with the `tafara-portfolio` repository for deployment.

---

## Step 1: Remove Parent Git Repository

The parent repository is not needed. Remove it:

```powershell
# Navigate to parent directory
cd "C:\Users\Lenovo\Tafara Website"

# Remove the parent .git folder
Remove-Item -Recurse -Force .git

# Verify it's gone
Test-Path .git
# Should return: False
```

---

## Step 2: Work in Portfolio Directory

From now on, always work inside the `tafara-portfolio` folder:

```powershell
# Navigate to portfolio
cd "C:\Users\Lenovo\Tafara Website\tafara-portfolio"

# Check git status
git status
```

---

## Step 3: Add and Commit Your Files

Now add the deployment files:

```powershell
# Make sure you're in tafara-portfolio directory
cd "C:\Users\Lenovo\Tafara Website\tafara-portfolio"

# Add all new files
git add .

# Commit
git commit -m "Add deployment configuration and guides"

# Push to GitHub
git push origin main
```

---

## Step 4: Continue with Deployment

Now follow the deployment steps in `DEPLOYMENT_STEPS.md` starting from Step 3 (Get Netlify Auth Token).

---

## Quick Commands (Copy & Paste)

```powershell
# 1. Remove parent git repo
cd "C:\Users\Lenovo\Tafara Website"
Remove-Item -Recurse -Force .git

# 2. Navigate to portfolio
cd tafara-portfolio

# 3. Add and commit files
git add .
git commit -m "Add deployment configuration and guides"

# 4. Push to GitHub
git push origin main
```

---

## Verify Everything is Fixed

After running the commands above:

```powershell
# Should show no parent .git
cd "C:\Users\Lenovo\Tafara Website"
Test-Path .git
# Output: False

# Should show portfolio .git exists
cd tafara-portfolio
Test-Path .git
# Output: True

# Should show clean status or ready to commit
git status
```

---

## Why This Happened

You likely initialized a Git repository in the parent folder (`Tafara Website`) by mistake, and then cloned or created the `tafara-portfolio` repository inside it.

For deployment, you only need the `tafara-portfolio` repository.

---

## Next Steps

1. ✅ Remove parent `.git` folder
2. ✅ Work only in `tafara-portfolio` directory
3. ✅ Add and commit deployment files
4. ✅ Push to GitHub
5. ✅ Continue with deployment (Step 3 in DEPLOYMENT_STEPS.md)
