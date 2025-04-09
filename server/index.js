const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const depositRoutes = require('./routes/depositRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', depositRoutes);

// ... existing code ... 