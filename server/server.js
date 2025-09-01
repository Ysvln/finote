
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));

app.set('trust proxy', 1);

app.listen(PORT, () => {
  console.log('Server listening on', PORT);
});
