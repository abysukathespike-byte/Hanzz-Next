export default function handler(req, res) {
  const apkInfo = {
    name: process.env.APK_NAME || 'HanzzExe',
    size: process.env.APK_SIZE || '1-5 MB',
    status: process.env.APK_STATUS || 'Not yet available',
    url: process.env.APK_URL || '',
    enabled: process.env.APK_ENABLED === 'true'
  };

  const js = `const SUPABASE_URL = ${JSON.stringify(process.env.SUPABASE_URL || '')};
const SUPABASE_KEY = ${JSON.stringify(process.env.SUPABASE_KEY || '')};
const APK_INFO = ${JSON.stringify(apkInfo)};
`;

  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(js);
}
