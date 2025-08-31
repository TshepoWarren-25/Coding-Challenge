import { Router } from 'express';
import { getAllCountries, getCountryByName } from '../services/countryService.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const list = await getAllCountries();
    res.json(list);
  } catch (e) {
    res.status(502).json({ error: 'Upstream failure' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const d = await getCountryByName(req.params.name);
    res.json(d);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

export default router;
