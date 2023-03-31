import { Router } from 'express';
import { create, getComment } from '../controllers/controller.comment.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = new Router();

//операции GRUD
// http://localhost:3002/api/comments/:id
router.post('/comments/:id', checkAuth, create); //создание коммента (/:id это id поста, который комментируется)
//router.post('/comments/:id', create); //создание коммента (/:id это id поста, который комментируется)
router.get('/comments/list/:id', getComment); //получение коммента по id поста
export default router;
