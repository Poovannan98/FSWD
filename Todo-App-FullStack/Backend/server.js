const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./Config/db');
const authRoutes = require('./Routes/authRoutes');
const todoRoutes = require('./Routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/register', authRoutes);
app.use('/login', authRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});