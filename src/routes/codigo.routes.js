import express from 'express';
import { getCodigoV1 } from '../controllers/codigo.controller.js';

const router = express.Router();

router.get('/codigov1', getCodigoV1);

export default router;
