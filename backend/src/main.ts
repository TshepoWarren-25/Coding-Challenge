import express from 'express';
import cors from 'cors';
import countriesRouter from './routes/countries.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/countries', countriesRouter);

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Backend listening http://localhost:${port}`));
}

export default app;
