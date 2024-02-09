import express from 'express';

import { getAccountDetails, getTransactionDetails, addCurrentTransaction } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/account/:id',verifyToken, getAccountDetails);
router.get('/transactions/:id', verifyToken, getTransactionDetails );
router.post('/currentTransaction/:id',verifyToken, addCurrentTransaction)

// router.post('/login', loginUser);

export default router;