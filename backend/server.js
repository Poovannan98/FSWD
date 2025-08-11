   const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');

   const app = express();
   app.use(cors());
   app.use(express.json());

   mongoose.connect(`mongodb+srv://poovannan:admin@cluster0.ffqsbny.mongodb.net/Sample?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });

   const UserSchema = new mongoose.Schema({
       email: { type: String, required: true, unique: true },
       password: { type: String, required: true },
   });

   const User = mongoose.model('User ', UserSchema);

   app.post('/api/signup', async (req, res) => {
       const { email, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({ email, password: hashedPassword });
       await user.save();
       res.status(201).send('User  created');
   });

   app.post('/api/login', async (req, res) => {
       const { email, password } = req.body;
       const user = await User.findOne({ email });
       if (user && (await bcrypt.compare(password, user.password))) {
           const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
           res.json({ token });
       } else {
           res.status(401).send('Invalid credentials');
       }
   });

   app.listen(5000, () => {
       console.log('Server running on http://localhost:5000');
   });
   