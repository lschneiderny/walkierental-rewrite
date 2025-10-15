# Database Setup for Vercel Production

## ⚠️ Important: SQLite is NOT recommended for Vercel production

Your current Prisma schema uses SQLite (`provider = "sqlite"`), which is a **file-based database** and **will not work properly on Vercel** due to:

1. **Serverless Functions**: Each invocation may run on a different server
2. **Ephemeral Filesystem**: Files are not persisted between deployments
3. **Read-only Filesystem**: Production Vercel functions have read-only access

## Recommended Database Options for Production

### Option 1: Vercel Postgres (Recommended)
**Pros**: Native integration, easy setup, automatic connection pooling
**Pricing**: Free tier available (60 hours compute time)

#### Setup Steps:
1. Install Vercel Postgres in your Vercel project dashboard
2. Update your `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
}
```

3. Set environment variables (automatically set by Vercel):
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

4. Run migrations:
```bash
npx prisma migrate deploy
```

### Option 2: PlanetScale
**Pros**: MySQL-compatible, generous free tier, excellent performance
**Pricing**: Free tier with 5GB storage

#### Setup Steps:
1. Create a PlanetScale account and database
2. Update your `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url = env("DATABASE_URL")
  relationMode = "prisma"
}
```

3. Get connection string from PlanetScale and set `DATABASE_URL` in Vercel

### Option 3: Supabase
**Pros**: Postgres-based, generous free tier, additional features (auth, storage)
**Pricing**: Free tier with 500MB database

#### Setup Steps:
1. Create a Supabase project
2. Update your `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
}
```

3. Get connection string (use "Transaction" mode) and set `DATABASE_URL` in Vercel

### Option 4: Neon
**Pros**: Serverless Postgres, generous free tier, instant scaling
**Pricing**: Free tier with 0.5GB storage

## Migration Steps

### 1. Export Current SQLite Data
```bash
# Generate SQL dump of your current data
npx prisma db push --force-reset
npx ts-node prisma/seed.ts
```

### 2. Update Prisma Schema
Choose one of the options above and update `prisma/schema.prisma`

### 3. Create Production Database
Follow the setup steps for your chosen provider

### 4. Run Migrations
```bash
# Generate migration files
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy
```

### 5. Seed Production Database
```bash
npx prisma db seed
```

### 6. Set Environment Variables in Vercel
Go to your Vercel project → Settings → Environment Variables

Add the appropriate DATABASE_URL for your provider

## Connection Pooling (Important!)

For production, always use connection pooling to avoid exhausting database connections:

### For Prisma with PostgreSQL:
Use `@prisma/adapter-pg` or connection pooling URLs

### For High-Traffic Applications:
Consider using Prisma Data Proxy or Prisma Accelerate

## Prisma Client Optimization

Your `prisma/schema.prisma` should include:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}
```

The `binaryTargets` ensures compatibility with Vercel's deployment environment.

## Environment Variables Required

Set these in Vercel project settings:

- `DATABASE_URL` - Your production database connection string
- `POSTGRES_PRISMA_URL` - (For Vercel Postgres) Connection pooling URL
- `POSTGRES_URL_NON_POOLING` - (For Vercel Postgres) Direct connection URL
- `NODE_ENV` - Set to "production"

## Testing Locally with Production Database

Create `.env.local`:
```bash
DATABASE_URL="your_production_database_url"
```

Then test:
```bash
npm run build
npm start
```

## Troubleshooting

### "Cannot find module '@prisma/client'"
Run: `npx prisma generate`

### "Database connection failed"
- Check connection string format
- Verify IP allowlist (some providers require whitelisting Vercel IPs)
- Ensure SSL is enabled in connection string

### "Too many connections"
- Use connection pooling
- Reduce connection timeout
- Consider Prisma Data Proxy

## Additional Resources

- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma Vercel Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Connection Pooling Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
