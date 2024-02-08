import express from "express";

import { promisePool as db } from "./db.js";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import path from "path";


//Routes
import userRoutes from './routes/user.routes.js';

import authRouter from './routes/auth.route.js';

import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());
const port = 3002;



app.use('/api/users', userRoutes);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));