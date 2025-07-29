import express from 'express';
const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});