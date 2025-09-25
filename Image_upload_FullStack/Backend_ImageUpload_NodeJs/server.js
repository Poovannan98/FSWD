const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require('./Config/db');
const uploadRoutes = require("./Routes/uploadRoutes");
 require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;


app.use("/api", uploadRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
