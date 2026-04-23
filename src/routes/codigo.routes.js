import express from 'express';
import { getCodigoV1, login, register, getProfile } from '../controllers/codigo.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/codigov1', getCodigoV1);

router.post('/login', login);
router.post('/register', register);

router.get('/profile', authenticateToken, getProfile);

router.get('/nava', (req, res ) => {
    res.status(200).json({
        endpoint: 'nava',
        message: 'Are you talking to me !!',
        timestamp: new Date().toISOString()
    })
});

export default router;
