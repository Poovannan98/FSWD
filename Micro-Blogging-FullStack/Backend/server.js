require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/db');

const authRoutes = require('./Routes/authRoutes');
const postRoutes = require('./Routes/postRoutes');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});