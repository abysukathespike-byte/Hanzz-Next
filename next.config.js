/** @type {import('next').NextConfig} */

// ==== TAMBAH TOOL BARU DI SINI ====
// Format: '/link-di-browser': 'nama-file.html' (file ada di folder public/)
// Lalu di owner panel > Tools, isi Link dengan /link-di-browser
const TOOL_PAGES = {
  'gen-sc': 'gen-sc.html',
  'bypass-delta': 'bypass-delta.html',
};

// Header keamanan. Microphone diizinkan hanya untuk situs ini sendiri (dibutuhkan voice note di DM).
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https:; media-src 'self' blob: https:; connect-src 'self' https: wss://*.supabase.co; frame-src 'self' https:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https:;"
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), payment=(), usb=(), microphone=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }
];

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async rewrites() {
    const toolRewrites = Object.entries(TOOL_PAGES).map(([link, file]) => ({
      source: link,
      destination: '/' + file,
    }));
    return {
      beforeFiles: [
        { source: '/', destination: '/index.html' },
        { source: '/bypass-delta', destination: '/bypass-delta.html' },
        { source: '/pp', destination: '/index.html' },
        { source: '/t-o-u', destination: '/index.html' },
        { source: '/api/config.js', destination: '/api/config' },
        ...toolRewrites,
      ],
    };
  },
};

module.exports = nextConfig;
