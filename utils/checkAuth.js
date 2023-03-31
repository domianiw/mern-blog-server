// Middleware перед функцией getMe - расшифровывает токен если он есть
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const checkAuth = (req, res, next) => {
  //req.headers.autorization = 'Bearer dfhcbdhfheh4y6hfgbfjdfjjdf'
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); //.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.id; //id из controller.auth.js

      next();
    } catch (error) {
      return res.json({ message: 'Нет доступа1' });
    }
  } else {
    return res.json({ message: 'Нет доступа2' });
  }
};
