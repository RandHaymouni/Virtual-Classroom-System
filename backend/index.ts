import express from 'express';
import connectDB from './config/db';

const app = express();
app.use(express.json());

connectDB();

app.get('/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});