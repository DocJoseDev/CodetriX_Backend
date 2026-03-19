import express from 'express';
import cors from 'cors';
import codigoRoutes from './routes/codigo.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', codigoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
