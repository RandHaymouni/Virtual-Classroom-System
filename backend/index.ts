import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import classesRouter from './routes/classes';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import studentRouter from './routes/student';
import assignmentsRouter from './routes/assignments';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5175'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/classes', classesRouter);
app.use('/api/student', studentRouter);
app.use('/api/assignments', assignmentsRouter);
app.get('/health', (req, res) => res.send('Server is running'));

app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test endpoint is working!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Virtual Classroom System Backend`);
  console.log(`📊 Server running on http://localhost:${PORT}`);
});
