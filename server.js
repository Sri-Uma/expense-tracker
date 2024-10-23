// server.js
const express = require('express');
const dotenv = require('dotenv');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
