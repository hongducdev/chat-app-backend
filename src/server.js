import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 4090;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true })); // to parse the incoming requests with urlencoded payloads (from req.body)
app.use(cookieParser());
app.use(
   cors({
      origin: ['http://localhost:4953', 'http://54.206.22.98:4953'],
      credentials: true,
   })
);

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, () => {
   connectToMongoDB();
   console.log(`Server running on port ${PORT}`);
});
