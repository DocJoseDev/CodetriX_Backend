import express from 'express';
// Importar ambos controladores: el existente y el nuevo
import { getCodigoV1, createRegistro } from '../controllers/codigo.controller.js';

const router = express.Router();

// Rutas GET existentes (se mantienen sin cambios)
router.get('/codigov1', getCodigoV1);

router.get('/nava', (req, res ) => {
    res.status(200).json({
        endpoint: 'nava',
        message: 'Are you talking to me !!',
        timestamp: new Date().toISOString()
    })
});

// Nueva ruta POST para crear registros
// POST /registros
// Body esperado: { "codigo_alumno": "A123" }
router.post('/registros', createRegistro);

export default router;
