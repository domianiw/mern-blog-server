import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import authRoute from './routes/route.auth.js';
import imgRoute from './routes/route.post.js';
import postRoute from './routes/route.post.js';
import commentRoute from './routes/route.comments.js';

mongoose.set('strictQuery', false);

const app = express();

//Constants
const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;

//Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); //для получения картинок с сервера

//Routes - подключение роутов
// http://localhost:3002/api/auth - регистрации и авторизации
app.use('/api/auth', authRoute); //authRoute - это название мы придумали когда импортировали роут из route.auth.js

//http://localhost:3002/ -  картинки
app.use('/', imgRoute);

//http://localhost:3002/api/post - посты - GRUD операции
app.use('/api', postRoute);

//http://localhost:3002/api/list - комменты - GRUD операции
app.use('/api', commentRoute);

async function start() {
  try {
    await mongoose.connect(process.env.DB_NAME);

    app.listen(process.env.PORT || 3002, () => {
      console.log(`server frontend ok on PORT${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
