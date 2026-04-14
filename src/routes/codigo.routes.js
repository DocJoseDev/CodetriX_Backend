import express from 'express';
import { getCodigoV1 } from '../controllers/codigo.controller.js';

const router = express.Router();

router.get('/codigov1', getCodigoV1);

router.get('/nava', (req, res ) => {
    res.status(200).json({
        endpoint: 'nava',
        message: 'Are you talking to me !!',
        timestamp: new Date().toISOString()
    })
});

export default router;
