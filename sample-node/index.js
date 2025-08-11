require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});