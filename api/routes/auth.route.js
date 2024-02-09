import express from 'express';

import { registerUser, loginUser, loginBanker, signout } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/user-register', registerUser);
router.post('/user-login', loginUser);
router.post('/banker-login', loginBanker);
router.get('/signout', signout);

export default router;