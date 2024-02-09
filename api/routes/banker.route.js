import express from 'express';

import { getAllAccounts, getTransaction } from '../controllers/banker.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/allaccounts',verifyToken, getAllAccounts);
router.get('/transaction/:id',verifyToken, getTransaction)


export default router;