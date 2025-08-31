import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const name = String(req.query.name || '');
  const backend = process.env.BACKEND_URL || 'http://localhost:3001';
  try {
    const r = await fetch(`${backend}/countries/${encodeURIComponent(name)}`);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Bad gateway' });
  }
}
