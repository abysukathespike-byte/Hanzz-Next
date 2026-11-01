// Minify file JS di public/ dan script inline di public/index.html.
// mangle: false supaya nama fungsi global (dipakai onclick di HTML) tidak berubah.
// Matikan dengan: SKIP_MINIFY=1 npm run build
import fs from 'node:fs';
import path from 'node:path';
import { minify } from 'terser';

if (process.env.SKIP_MINIFY === '1') {
  console.log('[minify] dilewati (SKIP_MINIFY=1)');
  process.exit(0);
}

const root = path.join(process.cwd(), 'public');
const opts = { mangle: false, compress: { passes: 1 }, format: { comments: false } };

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

async function minifyCode(src, label) {
  const r = await minify(src, opts);
  if (r.error) throw new Error(`[minify] ${label}: ${r.error.message}`);
  return r.code;
}

(async () => {
  // 1. File JS terpisah
  for (const f of walk(root).filter((f) => f.endsWith('.js'))) {
    const out = await minifyCode(fs.readFileSync(f, 'utf8'), f);
    fs.writeFileSync(f, out);
    console.log('[minify] ' + path.relative(root, f));
  }

  // 2. Script inline di index.html (yang tanpa atribut src)
  const htmlPath = path.join(root, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
  const matches = [...html.matchAll(re)];
  const replacements = [];
  for (const m of matches) {
    if (!m[2].trim()) continue;
    const code = await minifyCode(m[2], 'inline script');
    replacements.push({ start: m.index, end: m.index + m[0].length, text: `<script${m[1]}>${code}</script>` });
  }
  for (const r of replacements.reverse()) {
    html = html.slice(0, r.start) + r.text + html.slice(r.end);
  }
  fs.writeFileSync(htmlPath, html);
  console.log(`[minify] index.html: ${replacements.length} script inline`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
