import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisePool as db } from '../db.js';

export const registerUser = async (req, res) => {
    const { username, email, password, isBanker } = req.body;
    console.log(username, email, password, isBanker,"PPPPPPPP");
    // Add logic to hash password, check if user exists, and insert new user into database
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Add logic to verify user and password, generate JWT, and respond with token
};