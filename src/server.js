import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import testRoutes from './tests/index.route.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 4090;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true })); // to parse the incoming requests with urlencoded payloads (from req.body)

app.use(
   cors({
      origin: [
         'http://localhost:5173',
         'http://chatapp.hongduccodedao.io.vn:4953',
         'https://chatapp.hongduccodedao.io.vn',
      ],
      allowedHeaders: [
         'Access-Control-Allow-Headers',
         'Origin,Accept',
         'X-Requested-With',
         'Content-Type',
         'Access-Control-Request-Method',
         'Access-Control-Request-Headers',
         'Access-Control-Allow-Origin',
         'Authorization',
         'Set-Cookie',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      preflightContinue: true,
      exposedHeaders: ['Access-Control-Allow-Origin', 'x-auth-token'],
   })
);
app.use(cookieParser());
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' with { type: "json" };

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/test', testRoutes);
app.get('/', (req, res) => {
   res.status(200).json({ message: 'OK' });
});

server.listen(PORT, () => {
   connectToMongoDB();
   console.log(`Server running on port ${PORT}`);
});
