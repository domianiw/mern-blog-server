import { Router } from 'express';
import { register, login, getMe } from '../controllers/controller.auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

//Register
// http://localhost:3002/api/auth/register
router.post('/register', register);

//Login
// http://localhost:3002/api/auth/login
router.post('/login', login);

//Get Me - получение профиля при наличии токена
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe);
//router.get('/me', getMe);

export default router;
