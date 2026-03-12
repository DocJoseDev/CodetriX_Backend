const express = require('express');
const { getCodigoV1 } = require('../controllers/codigo.controller');

const router = express.Router();

router.get('/codigov1', getCodigoV1);

module.exports = router;
