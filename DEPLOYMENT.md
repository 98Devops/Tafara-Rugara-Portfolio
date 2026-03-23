# Deployment Guide

This guide covers deploying the Tafara Rugara Portfolio website to Netlify with optimal configuration for performance, security, and form handling.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git repository (GitHub, GitLab, or Bitbucket)
- Netlify account

## Quick Deployment

### 1. Prepare for Deployment

```bash
# Install dependencies
npm install

# Run tests to ensure everything works
npm run test:all

# Build the project
npm run build

# Test deployment configuration
npm run test:deployment
```

### 2. Deploy to Netlify

#### Option A: Git-based Deployment (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your Git provider and repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
     - **Node version**: `18`

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

#### Option B: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=.next
```

## Configuration Details

### Netlify Configuration (`netlify.toml`)

The project includes a comprehensive `netlify.toml` configuration that handles:

#### Build Settings
- **Node.js 18** environment
- **Production optimizations** with telemetry disabled
- **Static site generation** with Next.js

#### Performance Optimizations
- **Asset caching** with 1-year cache for static files
- **Compression** and minification enabled
- **CDN optimization** for global delivery
- **Image optimization** headers

#### Security Headers
- **Content Security Policy** (CSP)
- **X-Frame-Options** to prevent clickjacking
- **Strict Transport Security** (HSTS)
- **XSS Protection** and content type sniffing prevention

#### Form Handling
- **Netlify Forms** integration for contact form
- **Spam protection** built-in
- **Form validation** on both client and server side

### Environment Variables

Set these in Netlify dashboard under Site Settings > Environment Variables:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Testing Deployment

### Pre-deployment Testing

```bash
# Run all tests
npm run test:all

# Test deployment configuration
npm run test:deployment

# Performance audit
npm run lighthouse
```

### Post-deployment Testing

1. **Functionality Testing**
   - Navigate through all pages
   - Test responsive design on different devices
   - Verify all links and buttons work

2. **Form Testing**
   - Submit contact form with valid data
   - Test form validation with invalid data
   - Check Netlify dashboard for form submissions

3. **Performance Testing**
   - Run Lighthouse audit on live site
   - Test loading speed from different locations
   - Verify caching headers in browser dev tools

4. **Security Testing**
   - Check security headers using [Security Headers](https://securityheaders.com)
   - Verify HTTPS is working correctly
   - Test CSP compliance

## Performance Optimization

### Automatic Optimizations

The deployment includes several automatic optimizations:

- **Static Site Generation** for all pages
- **Image optimization** with WebP/AVIF formats
- **Bundle splitting** for optimal loading
- **Tree shaking** to remove unused code
- **Compression** (Gzip/Brotli) enabled

### Monitoring Performance

```bash
# Run Lighthouse audit
npm run lighthouse

# Analyze bundle size
npm run analyze
```

### Performance Targets

The site is configured to achieve:
- **Lighthouse Performance**: ≥90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## Form Handling

### Contact Form Configuration

The contact form is configured for Netlify Forms with:

- **Spam protection** enabled by default
- **Form validation** on client and server
- **Email notifications** (configure in Netlify dashboard)
- **Webhook integration** available for custom processing

### Form Submissions

Access form submissions in Netlify dashboard:
1. Go to your site dashboard
2. Click "Forms" in the sidebar
3. View submissions and configure notifications

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs in Netlify dashboard
# Common fixes:
npm run build  # Test locally first
npm run lint:fix  # Fix linting issues
```

#### Form Not Working
- Verify `data-netlify="true"` attribute exists
- Check hidden `form-name` field is present
- Ensure form name matches netlify.toml configuration

#### Performance Issues
```bash
# Analyze bundle size
npm run analyze

# Check for large dependencies
npm run lighthouse
```

#### Security Header Issues
- Check netlify.toml configuration
- Verify CSP doesn't block required resources
- Test with browser developer tools

### Getting Help

1. **Check Netlify Deploy Logs**
   - Go to site dashboard > Deploys
   - Click on failed deploy to see logs

2. **Test Locally**
   ```bash
   npm run build
   npm run start
   ```

3. **Community Support**
   - [Netlify Community](https://community.netlify.com)
   - [Next.js Documentation](https://nextjs.org/docs)

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Security audit
npm audit

# Test after updates
npm run test:all
```

### Monitoring

- Set up **Uptime monitoring** (Netlify Analytics or external service)
- Monitor **Core Web Vitals** with Google Search Console
- Review **Form submissions** regularly
- Check **Security headers** periodically

## Advanced Configuration

### Custom Domain

1. **Add Domain in Netlify**
   - Go to Site Settings > Domain management
   - Add your custom domain

2. **Configure DNS**
   - Point your domain to Netlify's servers
   - Enable HTTPS (automatic with Let's Encrypt)

### Analytics

```bash
# Add Netlify Analytics (paid feature)
# Or integrate Google Analytics in _app.tsx
```

### Redirects and Rewrites

Add custom redirects in `netlify.toml`:

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
```

This deployment configuration ensures optimal performance, security, and reliability for the portfolio website while maintaining ease of maintenance and updates.