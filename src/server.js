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
app.use(cookieParser());
app.use(
   cors({
      origin: ['http://localhost:4953', 'http://54.206.22.98:4953'],
      credentials: true,
   })
);
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' with { type: "json" };

const customSwaggerOptions = {
   explorer: true,
   swaggerOptions: {
     authAction: {
       JWT: {
         name: 'JWT',
         schema: {
           type: 'apiKey',
           in: 'header',
           name: 'Authorization',
           description: ''
         },
         value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUxZmM3NGRhYzUzYmEyMTUxZDUxNzMiLCJpYXQiOjE3MDkzNjk4OTMsImV4cCI6MTcxMTk2MTg5M30.flkjmWYYtoh6yCxh5I3wU5H0X4AjO9Pcv4_6JPX_HZQ'
       }
     }
   }
 }

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
// app.use('/test', testRoutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, customSwaggerOptions));

server.listen(PORT, () => {
   connectToMongoDB();
   console.log(`Server running on port ${PORT}`);
});
