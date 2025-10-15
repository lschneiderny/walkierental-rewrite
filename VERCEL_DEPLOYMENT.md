# Vercel Deployment Guide - WalkieRental

## 🚀 Pre-Deployment Checklist

### ✅ Completed Optimizations
- [x] Next.js config optimized with compression, image optimization, and caching headers
- [x] Webpack bundle splitting configured
- [x] Security headers added (HSTS, X-Frame-Options, CSP)
- [x] Prisma client optimized for serverless
- [x] Build scripts updated with Prisma generation
- [x] .vercelignore created to reduce deployment size
- [x] vercel.json configured with optimal settings

### ⚠️ Required Actions Before Deployment

1. **Setup Production Database** (CRITICAL)
   - Current setup uses SQLite which will NOT work on Vercel
   - See `VERCEL_DATABASE_SETUP.md` for detailed instructions
   - Recommended: Vercel Postgres, PlanetScale, Supabase, or Neon

2. **Configure Environment Variables in Vercel**
   - See section below

3. **Test Build Locally**
   - Run `npm run build` to ensure no errors

## 📋 Required Environment Variables

Set these in your Vercel project dashboard (Settings → Environment Variables):

### Database (Choose ONE option)

#### Option A: Vercel Postgres (Recommended)
```
POSTGRES_PRISMA_URL=postgres://...          # For Prisma (with connection pooling)
POSTGRES_URL_NON_POOLING=postgres://...     # For migrations
```

#### Option B: Other Database Providers
```
DATABASE_URL=your_database_connection_string
```

### Application Settings
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
```

### Optional (if you add these features later)
```
NEXT_PUBLIC_CONTACT_EMAIL=info@walkierentals.com
NEXT_PUBLIC_PHONE=+1-555-123-4567
```

## 🔧 Deployment Steps

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Preview**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Optimize for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure project settings (auto-detected from `vercel.json`)

3. **Set Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all required variables from above

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## ⚡ Performance Optimizations Applied

### Next.js Configuration
- **Output Mode**: `standalone` for minimal deployment size
- **Compression**: Enabled for all responses
- **Image Optimization**: AVIF and WebP with smart caching
- **Code Splitting**: Optimized vendor bundles and commons chunks
- **Console Removal**: Production builds strip console logs (except errors/warnings)
- **Package Optimization**: Optimized imports for `lucide-react` and `framer-motion`

### Caching Strategy
- **API Routes**: 60s cache with 300s stale-while-revalidate
- **Static Assets**: 1 year immutable cache
- **Fonts**: 1 year immutable cache

### Security Headers
- HSTS with preload
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- XSS Protection
- Referrer Policy

### Serverless Functions
- **Max Duration**: 10 seconds (configurable in `vercel.json`)
- **Memory**: 1024 MB
- **Region**: US East (iad1) - change in `vercel.json` if needed

## 🎯 Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check build logs in Vercel dashboard
# Test all routes:
# - Homepage (/)
# - Packages (/packages)
# - Contact (/contact)
# - API endpoints (/api/packages, /api/bookings)
```

### 2. Setup Custom Domain (Optional)
- Go to Vercel project → Settings → Domains
- Add your custom domain
- Configure DNS records as instructed

### 3. Monitor Performance
- Enable Vercel Analytics (Settings → Analytics)
- Enable Speed Insights for Core Web Vitals
- Monitor function execution times

### 4. Setup Monitoring (Recommended)
- Configure error tracking (e.g., Sentry)
- Setup uptime monitoring
- Enable Vercel log drains for centralized logging

## 🔍 Troubleshooting

### Build Fails: "Cannot find module '@prisma/client'"
**Solution**: Ensure `postinstall` script is in package.json
```json
"postinstall": "prisma generate"
```

### Runtime Error: "PrismaClient is unable to be run in the browser"
**Solution**: Check that you're only importing Prisma client in server components or API routes

### Database Connection Errors
**Solutions**:
- Verify `DATABASE_URL` is set correctly in Vercel
- Check if database allows connections from Vercel IPs
- Ensure SSL is enabled in connection string
- For Postgres: Use pooling URL for Prisma queries

### API Routes Timeout
**Solutions**:
- Increase `maxDuration` in `vercel.json`
- Optimize database queries
- Add indexes to frequently queried fields
- Consider implementing caching

### High Memory Usage
**Solutions**:
- Increase function memory in `vercel.json`
- Optimize bundle size
- Check for memory leaks in API routes
- Consider edge runtime for lighter functions

## 📊 Performance Monitoring

### Key Metrics to Watch
- **TTFB (Time to First Byte)**: Should be < 600ms
- **FCP (First Contentful Paint)**: Should be < 1.8s
- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **CLS (Cumulative Layout Shift)**: Should be < 0.1
- **Function Execution Time**: Should be < 2s

### Optimization Opportunities
1. **Database Queries**: Add indexes, use connection pooling
2. **Images**: Ensure using Next.js Image component
3. **Bundle Size**: Monitor with `npx @next/bundle-analyzer`
4. **API Caching**: Implement Redis for frequently accessed data

## 🔐 Security Best Practices

### Already Implemented
- ✅ Security headers configured
- ✅ HTTPS enforced via Vercel
- ✅ XSS protection enabled
- ✅ Frame options set

### Additional Recommendations
- [ ] Add rate limiting to API routes
- [ ] Implement CORS policies if needed
- [ ] Add input validation with Zod or similar
- [ ] Setup CSP (Content Security Policy) for inline scripts
- [ ] Enable Vercel WAF (Web Application Firewall) if on Pro plan

## 📈 Scaling Considerations

### Current Setup
- Serverless functions scale automatically
- Database connections managed via pooling

### For High Traffic
1. **Implement Redis Caching**
   - Add Vercel KV for session storage
   - Cache package data with TTL

2. **Optimize Database**
   - Add composite indexes
   - Use read replicas
   - Consider Prisma Accelerate

3. **Enable Edge Functions**
   - Move static routes to edge for global distribution
   - Use edge middleware for authentication

4. **CDN Optimization**
   - Vercel CDN is enabled by default
   - Consider additional CDN for media files

## 🛠️ Additional Vercel Features

### Vercel Analytics (Recommended)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Vercel Speed Insights
```bash
npm install @vercel/speed-insights
```

Add to `app/layout.tsx`:
```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## 🎉 You're Ready!

Your codebase is now optimized for Vercel deployment. Follow the deployment steps above and refer to `VERCEL_DATABASE_SETUP.md` for database configuration.

### Quick Start Command
```bash
# Install dependencies and generate Prisma client
npm install

# Setup your database (see VERCEL_DATABASE_SETUP.md)

# Test build locally
npm run build

# Deploy to Vercel
vercel --prod
```

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Platform Documentation](https://vercel.com/docs)
- [Prisma Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
