const express = require('express');
const cors = require('cors');
const codigoRoutes = require('./routes/codigo.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', codigoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
