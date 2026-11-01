# HanzzExe (Next.js)

## Deploy ke Vercel
1. Buat project baru di Vercel, lalu upload folder ini (atau push ke GitHub).
2. Framework: Next.js (otomatis). Build command: `npm run build`.
3. Deploy.

## Minify
`npm run build` otomatis minify JS di `public/` dan script inline di `index.html`.
Kalau ada yang error setelah build, pakai `SKIP_MINIFY=1 npm run build` untuk mematikan minify.

## Catatan
- Sebelum live, tes dulu di Preview deployment.
- `bypass-delta.html` belum ada. Tambahkan ke `public/` setelah teksnya siap.
- Jalankan SQL dari `supabase_backend_full.sql` (dan `supabase_fix_v6.sql`) di Supabase, bukan dari project ini.
