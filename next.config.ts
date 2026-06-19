import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Static export configuration for Netlify (production only)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'fast-check'],
    // optimizeCss: true, // Disabled due to critters dependency issue
  },

  // Image optimization - disabled for static export
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression and caching
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Bundle optimization
  webpack: (config, { dev }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              chunks: 'all',
              priority: 10,
            },
            heroicons: {
              test: /[\\/]node_modules[\\/]@heroicons[\\/]/,
              name: 'heroicons',
              chunks: 'all',
              priority: 10,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      // Note: Do NOT set sideEffects to false — it strips CSS/Tailwind imports
    }

    return config;
  },

  // Headers for caching and security - handled by netlify.toml for static export
  // async headers() removed - not compatible with output: 'export'
};

export default withBundleAnalyzer(nextConfig);
