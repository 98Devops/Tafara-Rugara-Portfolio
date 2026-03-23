# Troubleshooting Guide

This guide provides solutions to common issues you might encounter while developing, testing, or deploying the Tafara Portfolio website.

## Table of Contents

- [Development Issues](#development-issues)
- [Build and Compilation Issues](#build-and-compilation-issues)
- [Testing Issues](#testing-issues)
- [Performance Issues](#performance-issues)
- [Deployment Issues](#deployment-issues)
- [Browser and Compatibility Issues](#browser-and-compatibility-issues)
- [Environment and Configuration Issues](#environment-and-configuration-issues)
- [Debugging Tools and Techniques](#debugging-tools-and-techniques)

## Development Issues

### Development Server Won't Start

**Problem**: `npm run dev` fails to start or shows port conflicts.

**Solutions**:

1. **Port already in use**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
npm run dev -- -p 3001
```

2. **Node.js version issues**:
```bash
# Check Node.js version (should be 18+)
node --version

# If using nvm, switch to correct version
nvm use 18
nvm install 18 # if not installed
```

3. **Corrupted node_modules**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

4. **Cache issues**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force
```

### Hot Reload Not Working

**Problem**: Changes to files don't trigger automatic reload.

**Solutions**:

1. **Check file watchers limit** (Linux/macOS):
```bash
# Increase file watchers limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. **Disable antivirus real-time scanning** on project folder (Windows)

3. **Check if files are being saved**:
   - Ensure auto-save is enabled in your editor
   - Check file permissions

4. **Restart development server**:
```bash
# Stop server (Ctrl+C) and restart
npm run dev
```

### TypeScript Errors

**Problem**: TypeScript compilation errors or type checking issues.

**Solutions**:

1. **Run type checking**:
```bash
npm run type-check
```

2. **Common type issues**:
```typescript
// ❌ Missing type annotation
const data = await fetch('/api/data');

// ✅ Proper typing
const data: Response = await fetch('/api/data');
const jsonData: PortfolioData = await data.json();
```

3. **Update TypeScript and types**:
```bash
npm update typescript @types/node @types/react @types/react-dom
```

4. **Check tsconfig.json**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "skipLibCheck": true
  }
}
```

### Import/Module Resolution Issues

**Problem**: Cannot resolve module imports or path aliases.

**Solutions**:

1. **Check path aliases in tsconfig.json**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/data/*": ["./src/data/*"]
    }
  }
}
```

2. **Verify file extensions**:
```typescript
// ✅ Include file extension for non-TS files
import styles from './Component.module.css';

// ✅ No extension needed for TS/TSX files
import Component from './Component';
```

3. **Check case sensitivity**:
```typescript
// ❌ Wrong case
import hero from './Hero';

// ✅ Correct case
import Hero from './Hero';
```

## Build and Compilation Issues

### Build Failures

**Problem**: `npm run build` fails with various errors.

**Solutions**:

1. **Clear caches and rebuild**:
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

2. **Check for TypeScript errors**:
```bash
npm run type-check
```

3. **Lint issues**:
```bash
npm run lint:fix
```

4. **Memory issues**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

5. **Check for circular dependencies**:
```bash
# Install circular dependency checker
npm install --save-dev madge

# Check for circular dependencies
npx madge --circular src/
```

### Bundle Size Issues

**Problem**: Bundle size is too large or build warnings about large chunks.

**Solutions**:

1. **Analyze bundle**:
```bash
npm run analyze
```

2. **Check for large dependencies**:
```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Analyze bundle
npm run analyze:browser
```

3. **Optimize imports**:
```typescript
// ❌ Imports entire library
import * as _ from 'lodash';

// ✅ Import only what you need
import { debounce } from 'lodash';

// ✅ Even better - use tree-shakable alternative
import debounce from 'lodash/debounce';
```

4. **Dynamic imports for large components**:
```typescript
// Dynamic import for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### Image Optimization Issues

**Problem**: Images not loading or optimization errors.

**Solutions**:

1. **Check image paths**:
```typescript
// ✅ Correct path for public folder
<Image src="/images/hero-bg.jpg" alt="Hero background" />

// ❌ Wrong path
<Image src="./images/hero-bg.jpg" alt="Hero background" />
```

2. **Verify image formats**:
```typescript
// Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
```

3. **Check image dimensions**:
```typescript
// Always provide width and height for optimization
<Image 
  src="/images/project.jpg" 
  alt="Project screenshot"
  width={800}
  height={600}
/>
```

4. **Configure next.config.ts**:
```typescript
images: {
  formats: ['image/webp', 'image/avif'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Testing Issues

### Jest Test Failures

**Problem**: Unit tests failing or Jest configuration issues.

**Solutions**:

1. **Clear Jest cache**:
```bash
npx jest --clearCache
```

2. **Check Jest configuration** (`jest.config.js`):
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

3. **Mock external dependencies**:
```javascript
// jest.setup.js
import 'jest-dom/extend-expect';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
  },
}));
```

4. **Debug specific tests**:
```bash
# Run specific test file
npm test -- Hero.test.tsx

# Run tests with verbose output
npm test -- --verbose

# Run tests in watch mode
npm run test:watch
```

### Property-Based Test Issues

**Problem**: Property-based tests failing or taking too long.

**Solutions**:

1. **Check test configuration**:
```typescript
// Ensure consistent seed for reproducible tests
fc.assert(fc.property(
  fc.string(),
  (input) => {
    // Test logic
  }
), { numRuns: 100, seed: 42 });
```

2. **Debug failing properties**:
```typescript
// Add verbose logging
fc.assert(fc.property(
  fc.string(),
  (input) => {
    console.log('Testing with input:', input);
    // Test logic
  }
), { verbose: true });
```

3. **Optimize generators**:
```typescript
// ❌ Too broad generator
fc.string()

// ✅ Constrained generator
fc.string({ minLength: 1, maxLength: 100 })
```

### Playwright E2E Test Issues

**Problem**: End-to-end tests failing or browser issues.

**Solutions**:

1. **Install browsers**:
```bash
npx playwright install
```

2. **Run tests in headed mode for debugging**:
```bash
npm run test:e2e:headed
```

3. **Check test configuration** (`playwright.config.ts`):
```typescript
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

4. **Debug specific tests**:
```bash
# Run specific test file
npx playwright test navigation.spec.ts

# Run with UI mode
npm run test:e2e:ui

# Generate test report
npx playwright show-report
```

5. **Common test fixes**:
```typescript
// Wait for elements to be visible
await expect(page.locator('h1')).toBeVisible();

// Wait for network requests
await page.waitForLoadState('networkidle');

// Handle dynamic content
await page.waitForSelector('[data-testid="content"]');
```

## Performance Issues

### Slow Page Load Times

**Problem**: Pages loading slower than expected (>2 seconds).

**Solutions**:

1. **Run Lighthouse audit**:
```bash
npm run lighthouse
```

2. **Check bundle size**:
```bash
npm run analyze
```

3. **Optimize images**:
   - Use WebP/AVIF formats
   - Implement proper sizing
   - Add loading="lazy" for below-fold images

4. **Review third-party scripts**:
```typescript
// Use next/script for third-party scripts
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
/>
```

5. **Enable compression**:
```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  // ... other config
};
```

### Animation Performance Issues

**Problem**: Animations causing frame drops or poor performance.

**Solutions**:

1. **Use transform and opacity for animations**:
```typescript
// ✅ GPU-accelerated properties
const variants = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
};

// ❌ Avoid animating layout properties
const badVariants = {
  initial: { height: 0, width: 0 },
  animate: { height: 'auto', width: 'auto' },
};
```

2. **Reduce animation complexity**:
```typescript
// Limit number of animated elements
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Reduce stagger delay
      delayChildren: 0.2,
    }
  }
};
```

3. **Use will-change CSS property**:
```css
.animated-element {
  will-change: transform, opacity;
}
```

4. **Monitor performance**:
```typescript
// Add performance monitoring
useEffect(() => {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log('Performance entry:', entry);
    });
  });
  observer.observe({ entryTypes: ['measure', 'navigation'] });
}, []);
```

### Memory Leaks

**Problem**: Memory usage increasing over time or browser becoming unresponsive.

**Solutions**:

1. **Clean up event listeners**:
```typescript
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

2. **Cancel async operations**:
```typescript
useEffect(() => {
  const abortController = new AbortController();
  
  fetch('/api/data', { signal: abortController.signal })
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    });
  
  return () => {
    abortController.abort();
  };
}, []);
```

3. **Optimize re-renders**:
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## Deployment Issues

### Netlify Build Failures

**Problem**: Deployment failing on Netlify with build errors.

**Solutions**:

1. **Check build logs** in Netlify dashboard under "Deploys"

2. **Test build locally**:
```bash
npm run build
npm run start
```

3. **Environment variables**:
   - Ensure all required environment variables are set in Netlify dashboard
   - Check variable names match exactly (case-sensitive)

4. **Node.js version**:
```toml
# netlify.toml
[build.environment]
  NODE_VERSION = "18"
```

5. **Build command issues**:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

### Form Submission Issues

**Problem**: Contact form not working or submissions not received.

**Solutions**:

1. **Check form attributes**:
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

2. **Verify netlify.toml configuration**:
```toml
[[forms]]
  name = "contact"
```

3. **Check form submissions** in Netlify dashboard under "Forms"

4. **Test form locally**:
   - Forms won't work in development
   - Deploy to test form functionality

### Custom Domain Issues

**Problem**: Custom domain not working or SSL certificate issues.

**Solutions**:

1. **DNS configuration**:
   - Point domain to Netlify's load balancer
   - Use CNAME for subdomains, A record for apex domains

2. **SSL certificate**:
   - Let's Encrypt certificates are automatic
   - Check certificate status in Netlify dashboard

3. **Force HTTPS**:
```toml
# netlify.toml
[[redirects]]
  from = "http://yourdomain.com/*"
  to = "https://yourdomain.com/:splat"
  status = 301
  force = true
```

## Browser and Compatibility Issues

### Cross-Browser Compatibility

**Problem**: Website not working correctly in specific browsers.

**Solutions**:

1. **Check browser support**:
```javascript
// Check if browser supports required features
if ('IntersectionObserver' in window) {
  // Use Intersection Observer
} else {
  // Fallback implementation
}
```

2. **Add polyfills**:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    polyfillsOptimization: true,
  },
};
```

3. **Test in multiple browsers**:
```bash
# Run E2E tests across browsers
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=webkit
```

### Mobile Responsiveness Issues

**Problem**: Layout breaking on mobile devices.

**Solutions**:

1. **Use responsive design utilities**:
```typescript
// Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

2. **Test on actual devices**:
   - Use browser dev tools device simulation
   - Test on real mobile devices

3. **Check viewport meta tag**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

4. **Debug responsive issues**:
```css
/* Add temporary borders to debug layout */
* {
  border: 1px solid red !important;
}
```

### JavaScript Disabled

**Problem**: Website not working with JavaScript disabled.

**Solutions**:

1. **Ensure basic functionality works**:
   - Navigation should work with HTML links
   - Forms should submit without JavaScript

2. **Progressive enhancement**:
```typescript
// Check if JavaScript is available
const [jsEnabled, setJsEnabled] = useState(false);

useEffect(() => {
  setJsEnabled(true);
}, []);

return (
  <div>
    {jsEnabled ? (
      <InteractiveComponent />
    ) : (
      <StaticFallback />
    )}
  </div>
);
```

## Environment and Configuration Issues

### Environment Variables

**Problem**: Environment variables not loading or incorrect values.

**Solutions**:

1. **Check file naming**:
   - `.env.local` for local development
   - `.env.production` for production

2. **Variable naming**:
```bash
# ✅ Correct naming for client-side variables
NEXT_PUBLIC_SITE_URL=https://example.com

# ❌ Won't work on client-side
SITE_URL=https://example.com
```

3. **Restart development server** after changing environment variables

4. **Check variable loading**:
```typescript
console.log('Environment variables:', {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  nodeEnv: process.env.NODE_ENV,
});
```

### Configuration File Issues

**Problem**: Configuration files not being recognized or causing errors.

**Solutions**:

1. **Check file extensions**:
   - `next.config.js` vs `next.config.ts`
   - `tailwind.config.js` vs `tailwind.config.ts`

2. **Validate configuration syntax**:
```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuration options
};

export default nextConfig;
```

3. **Restart development server** after configuration changes

## Debugging Tools and Techniques

### Browser Developer Tools

1. **Console debugging**:
```typescript
// Add debug logs
console.log('Component rendered with props:', props);
console.error('Error occurred:', error);
console.warn('Warning:', warning);
```

2. **Network tab**:
   - Check for failed requests
   - Monitor loading times
   - Verify correct headers

3. **Performance tab**:
   - Record performance profiles
   - Identify bottlenecks
   - Monitor frame rates

### React Developer Tools

1. **Install React DevTools** browser extension

2. **Component inspection**:
   - View component props and state
   - Track re-renders
   - Profile component performance

3. **Profiler**:
   - Identify slow components
   - Optimize render performance

### Next.js Debugging

1. **Enable debug mode**:
```bash
DEBUG=* npm run dev
```

2. **Build analysis**:
```bash
npm run build -- --debug
```

3. **Bundle analysis**:
```bash
ANALYZE=true npm run build
```

### VS Code Debugging

1. **Launch configuration** (`.vscode/launch.json`):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "pwa-chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

2. **Start debugging**:
```bash
NODE_OPTIONS='--inspect' npm run dev
```

### Logging and Monitoring

1. **Structured logging**:
```typescript
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data);
  },
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

2. **Performance monitoring**:
```typescript
// Monitor Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

3. **Error boundaries**:
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

## Getting Additional Help

### Documentation Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Playwright Documentation](https://playwright.dev)
- [Jest Documentation](https://jestjs.io/docs)

### Community Support

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [React Community](https://reactjs.org/community/support.html)
- [Netlify Community](https://community.netlify.com)
- [Stack Overflow](https://stackoverflow.com) - Use relevant tags (nextjs, react, tailwindcss)

### Creating Bug Reports

When reporting issues, include:

1. **Environment information**:
   - Node.js version
   - npm/yarn version
   - Operating system
   - Browser version

2. **Steps to reproduce**:
   - Exact commands run
   - Expected vs actual behavior
   - Error messages

3. **Code samples**:
   - Minimal reproducible example
   - Relevant configuration files

4. **Logs and screenshots**:
   - Console errors
   - Network tab information
   - Visual issues (screenshots)

This troubleshooting guide should help resolve most common issues. If you encounter problems not covered here, don't hesitate to create an issue in the project repository with detailed information about the problem.