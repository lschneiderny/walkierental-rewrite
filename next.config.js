const path = require('path')

module.exports = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}
