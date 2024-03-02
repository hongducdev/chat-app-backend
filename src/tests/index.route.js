import { Router } from 'express';

import { login, logout, signup } from '../controllers/auth.controller.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';
const router = Router();

router.post('/api/auth/signup', signup);
router.post('/api/auth/login', login);
router.post('/api/auth/logout', logout);
router.get('/api/messages/:id', getMessages);
router.post('/api/messages/send/:id', sendMessage);
router.get('/api/users', getUsersForSidebar);

export default router;
