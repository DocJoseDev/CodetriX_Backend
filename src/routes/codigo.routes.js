import express from 'express';
import { getCodigoV1 } from '../controllers/codigo.controller.js';
import { generateCaptcha, verifyCaptcha } from '../controllers/captcha.controller.js';

const router = express.Router();

router.get('/codigov1', getCodigoV1);
router.get('/captcha', generateCaptcha);
router.post('/captcha/verify', verifyCaptcha);

router.get('/nava', (req, res ) => {
    res.status(200).json({
        endpoint: 'nava',
        message: 'Are you talking to me !!',
        timestamp: new Date().toISOString()
    })
});

export default router;
