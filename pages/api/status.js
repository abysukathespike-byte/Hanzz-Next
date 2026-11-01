// Contoh API route (jalan di server). Fitur admin nanti dipindah ke sini,
// supaya service role key tidak pernah ada di browser.
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ ok: true, app: 'HanzzExe' });
}
