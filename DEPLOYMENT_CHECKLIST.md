# ✅ Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment to Vercel.

## Pre-Deployment

### 🔴 Critical (Must Complete)
- [ ] **Setup production database** (SQLite won't work on Vercel!)
  - [ ] Choose provider: Vercel Postgres / PlanetScale / Supabase / Neon
  - [ ] Create database instance
  - [ ] Get connection string
  - [ ] Update `prisma/schema.prisma` datasource
  - [ ] Run `npx prisma migrate dev --name init`
  - [ ] Run `npx prisma db seed` (if using seed data)

### 🟡 Important (Recommended)
- [ ] Test build locally: `npm run build`
- [ ] Test production locally: `npm start`
- [ ] Review `.env.example` for required variables
- [ ] Prepare database connection string

### 🟢 Optional (Nice to Have)
- [ ] Setup custom domain DNS records
- [ ] Prepare analytics/monitoring tools
- [ ] Review API route performance

## Vercel Configuration

### Environment Variables to Set
- [ ] `DATABASE_URL` or `POSTGRES_PRISMA_URL` (depending on provider)
- [ ] `POSTGRES_URL_NON_POOLING` (if using Vercel Postgres)
- [ ] `NODE_ENV` (auto-set to "production")
- [ ] `NEXT_PUBLIC_APP_URL` (your production URL)

### Optional Variables
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL`
- [ ] `NEXT_PUBLIC_PHONE`

## Deployment Process

### Via GitHub (Recommended for CI/CD)
- [ ] Push code to GitHub repository
- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import your GitHub repository
- [ ] Configure environment variables
- [ ] Click "Deploy"

### Via Vercel CLI
- [ ] Install CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy preview: `vercel`
- [ ] Set environment variables in dashboard
- [ ] Deploy production: `vercel --prod`

## Post-Deployment Verification

### Test All Routes
- [ ] Homepage: `https://your-domain.vercel.app/`
- [ ] Packages page: `/packages`
- [ ] Contact page: `/contact`
- [ ] Admin inventory: `/admin/inventory`

### Test API Endpoints
- [ ] GET `/api/packages` - List all packages
- [ ] GET `/api/packages/[id]` - Single package
- [ ] GET `/api/packages/[id]/availability` - Check availability
- [ ] POST `/api/bookings` - Create booking
- [ ] GET `/api/inventory` - List inventory

### Performance Checks
- [ ] Page load times < 3s
- [ ] API response times < 1s
- [ ] Images loading properly
- [ ] No console errors in browser

### Database Verification
- [ ] Database connection working
- [ ] Prisma queries executing successfully
- [ ] Seed data visible (if applicable)

## Monitoring Setup

### Vercel Features (Recommended)
- [ ] Enable Vercel Analytics
- [ ] Enable Speed Insights
- [ ] Review deployment logs
- [ ] Setup log drains (if needed)

### Third-Party (Optional)
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Configure uptime monitoring
- [ ] Setup performance monitoring

## Security

- [ ] Verify HTTPS is enabled (automatic on Vercel)
- [ ] Check security headers in browser DevTools
- [ ] Verify environment variables are not exposed
- [ ] Review CORS settings (if applicable)

## Custom Domain (Optional)

- [ ] Add domain in Vercel dashboard
- [ ] Configure DNS records:
  - [ ] A record or CNAME to Vercel
  - [ ] Verify domain ownership
- [ ] Wait for SSL certificate provisioning
- [ ] Test domain access

## Documentation Review

Before deploying, ensure you've read:
- [ ] `OPTIMIZATION_SUMMARY.md` - What was optimized
- [ ] `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
- [ ] `VERCEL_DATABASE_SETUP.md` - Database migration steps
- [ ] `.env.example` - Required environment variables

## Final Pre-Launch

- [ ] All critical items completed above
- [ ] Build passes with no errors
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Test deployment verified

## Post-Launch

### Immediate (Within 1 hour)
- [ ] Monitor error logs
- [ ] Test all critical user flows
- [ ] Verify analytics tracking

### Within 24 hours
- [ ] Check performance metrics
- [ ] Review function execution times
- [ ] Monitor database query performance
- [ ] Check for any error spikes

### Within 1 week
- [ ] Review Web Vitals scores
- [ ] Analyze user behavior patterns
- [ ] Optimize slow queries if needed
- [ ] Consider edge caching strategies

## Troubleshooting Resources

If you encounter issues:
1. Check `VERCEL_DEPLOYMENT.md` troubleshooting section
2. Review Vercel deployment logs
3. Verify environment variables are set correctly
4. Check database connection strings
5. Review [Vercel documentation](https://vercel.com/docs)

---

## Quick Reference

### Files Modified/Created
- ✅ `next.config.js` - Optimized configuration
- ✅ `vercel.json` - Vercel-specific settings
- ✅ `package.json` - Updated build scripts
- ✅ `prisma/schema.prisma` - Serverless optimizations
- ✅ `.vercelignore` - Deployment exclusions
- ✅ `.env.example` - Environment template

### Key Commands
```bash
# Test build
npm run build

# Test production locally
npm start

# Deploy preview
vercel

# Deploy production
vercel --prod

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

---

**Ready to deploy?** Start with the "Pre-Deployment" section above! 🚀
