# 🚀 GitHub Pages Deployment Guide

## Quick Start - 3 Steps to Deploy

### Step 1: Create GitHub Repository

1. Go to https://github.com and log in
2. Click the **"+"** icon in top right → **"New repository"**
3. Fill in:
   - **Repository name**: `green-stocks` (or any name)
   - **Description**: "Sustainable investing platform with ESG ratings"
   - **Public** ✅ (must be public for free GitHub Pages)
   - ❌ Don't check "Initialize with README"
4. Click **"Create repository"**

### Step 2: Upload Your Files

You have two options:

#### Option A: Upload via GitHub Website (Easiest)

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL 6 files from the `green-stocks` folder:
   - `index.html`
   - `mobile.html`
   - `web.html`
   - `green-stocks-app.jsx`
   - `green-stocks-web.jsx`
   - `README.md`
3. Add commit message: "Initial commit: Green Stocks Platform"
4. Click **"Commit changes"**

#### Option B: Upload via Git Command Line

```bash
# Navigate to the green-stocks folder
cd green-stocks

# Add your GitHub repository as remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/green-stocks.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. In your repository, click **"Settings"** tab
2. In left sidebar, click **"Pages"**
3. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
4. Click **"Save"**
5. Wait 1-2 minutes for deployment

### 🎉 Your Site is Live!

Access your site at:
```
https://YOUR-USERNAME.github.io/green-stocks/
```

(Replace YOUR-USERNAME with your actual GitHub username)

---

## 📋 Complete File Checklist

Make sure you have all these files:

- ✅ `index.html` - Landing page with version chooser
- ✅ `mobile.html` - Mobile app launcher
- ✅ `web.html` - Web app launcher
- ✅ `green-stocks-app.jsx` - Mobile React component
- ✅ `green-stocks-web.jsx` - Web React component
- ✅ `README.md` - Documentation

---

## 🔧 Troubleshooting

### Problem: Page shows 404 error
**Solution**: 
- Wait 2-3 minutes after enabling Pages
- Check that repository is **Public**
- Verify files are in root folder (not in subfolder)

### Problem: Apps don't load / blank page
**Solution**:
- Check browser console for errors (F12)
- Verify all .jsx files are uploaded
- Try clearing browser cache (Ctrl+Shift+Delete)

### Problem: React components not working
**Solution**:
- Make sure the HTML files are loading the JSX files correctly
- Check that file names match exactly (case-sensitive)
- Ensure all files are in the same directory

### Problem: Can't find repository settings
**Solution**:
- Make sure you're the repository owner
- Free accounts need public repositories for Pages
- Look for "Settings" tab at top of repository page

---

## 🔄 Updating Your Site

After making changes to your files:

### Via GitHub Website:
1. Click on the file you want to edit
2. Click the pencil icon (✏️) 
3. Make your changes
4. Click "Commit changes"
5. Wait 1-2 minutes for redeployment

### Via Git Command Line:
```bash
# Make your changes to files
# Then:
git add .
git commit -m "Description of your changes"
git push
```

---

## 🎨 Customization Ideas

### Change Landing Page Colors
Edit `index.html` and modify the Tailwind classes:
- `from-green-50` → `from-blue-50` (change green to blue)
- `bg-green-600` → `bg-purple-600` (change buttons)

### Add Your Logo
In `index.html`, replace the leaf icon with your logo URL:
```html
<img src="your-logo.png" alt="Logo" class="w-20 h-20" />
```

### Modify Stock Data
Edit the `mockStocks` array in both JSX files to add/remove/modify stocks

---

## 📱 Testing Your Site

### Desktop Browser:
1. Visit your GitHub Pages URL
2. Test both Mobile and Web app versions
3. Try all features: watchlist, portfolio, alerts, news

### Mobile Device:
1. Open your GitHub Pages URL on your phone
2. Test the mobile version
3. Add to home screen for app-like experience:
   - iOS: Share → Add to Home Screen
   - Android: Menu → Add to Home screen

---

## 🌐 Custom Domain (Optional)

Want to use your own domain like `stocks.yourdomain.com`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In your domain's DNS settings, add:
   - Type: `CNAME`
   - Name: `stocks` (or `www`)
   - Value: `YOUR-USERNAME.github.io`
3. In GitHub repository Settings → Pages:
   - Enter your custom domain
   - Click "Save"
   - Wait for DNS to propagate (1-24 hours)

---

## 🔒 Security Notes

- Never commit API keys directly to GitHub
- Use environment variables or GitHub Secrets for sensitive data
- Keep repository public only if content is meant to be public

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Landing page loads correctly
- [ ] Mobile app button works
- [ ] Web app button works
- [ ] Stock cards display properly
- [ ] Watchlist saves/loads from localStorage
- [ ] Portfolio tracking calculates correctly
- [ ] Price alerts can be created
- [ ] News section displays articles
- [ ] Responsive design works on mobile

---

## 📞 Getting Help

If you encounter issues:

1. Check GitHub Pages status: https://www.githubstatus.com/
2. Review GitHub Pages docs: https://docs.github.com/pages
3. Search GitHub Community: https://github.com/orgs/community/discussions
4. Open an issue in your repository

---

## 🎓 Next Steps

1. ✅ Deploy to GitHub Pages
2. 📱 Test on multiple devices
3. 🔌 Integrate real APIs (Alpha Vantage, Finnhub)
4. 🎨 Customize colors and branding
5. 📊 Add more stocks and sectors
6. 🌐 Set up custom domain (optional)
7. 📈 Add analytics (Google Analytics)
8. 🚀 Share with friends!

---

**Need help?** Open an issue on GitHub or check the README.md for more details.

**Happy deploying! 🎉**
