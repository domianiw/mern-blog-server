//функции описывают как будут обрабатываться данные с фронтэнда и что будет отдаваться на фронтэнд
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({ message: 'Пользователь с таким именем уже существует' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({ newUser, token, message: 'Регистрация успешна ' });
  } catch (error) {
    res.json({ message: 'Ошибка при регистрации #' });
  }
};

//Login user
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({ message: 'Такого пользователя не существует' });
  }

  const isPasswordReal = await bcrypt.compare(password, user.password);

  if (!isPasswordReal) {
    return res.json({ message: 'Неверный пароль' });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  res.json({ user, token, message: 'Вы вошли в систему' });

  try {
  } catch (error) {
    res.json({ message: 'Ошибка при авторизации' });
  }
};
//Get me - авторизован пользователь или нет (имеется токен или нет)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.json({ message: 'Такого пользователя не существует' });
    }
    //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({
      user,
      //token,
    });
  } catch (error) {
    return res.json({ message: 'Нет доступа' });
  }
};
