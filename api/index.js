import express from "express";

import { promisePool as db } from "./db.js";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import path from "path";


//Routes
import userRoutes from './routes/user.routes.js';

import authRouter from './routes/auth.route.js';

import bankerRouter from './routes/banker.route.js'

import cors from 'cors';

const app = express();
app.use(cookieParser());
app.use(express.json());
const port = 3002;

const __dirname = path.resolve();

app.use('/api/user', userRoutes);
app.use('/api/auth', authRouter);
app.use('/api/banker', bankerRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));