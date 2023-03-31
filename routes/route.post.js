import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import upload from '../utils/upload.js';
import { uploadImg } from '../controllers/controller.post.js';
import {
  create,
  getAll,
  getById,
  getMyPosts,
  deletePost,
  editPost,
} from '../controllers/controller.post.js';

const router = new Router();
//загрузка картинок
// http://localhost:3002/uploads
router.post('/uploads', upload, uploadImg); //const upload = multer({ storage, fileFilter, limits });

//операции GRUD
// http://localhost:3002/api/posts
router.post('/posts', checkAuth, create); //создание поста
//router.post('/posts', create); //создание поста
router.get('/posts', getAll); //получение всех постов
router.get('/posts/:id', getById); //получение одного поста, по которому кликнули (по id)
router.get('/posts/user/me', checkAuth, getMyPosts); //получение всех постов конкретного пользователя
//router.get('/posts/user/me', getMyPosts); //получение всех постов конкретного пользователя
router.delete('/posts/:id', checkAuth, deletePost); //удаление поста
//router.delete('/posts/:id', deletePost); //удаление поста
router.patch('/posts/:id/edit', checkAuth, editPost); //редактирование поста
//router.patch('/posts/:id/edit', editPost); //редактирование поста

export default router;
