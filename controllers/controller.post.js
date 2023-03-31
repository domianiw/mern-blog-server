import Post from '../models/Post.js';
import User from '../models/User.js';

//загрузка картинок
export const uploadImg = (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
};

//создание поста
export const create = async (req, res) => {
  try {
    const user = await User.findById(req.userId); //user - данные из БД

    const newPost = new Post({
      username: user.username,
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      author: req.userId,
    });

    const post = await newPost.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: post }, //$push добавляет новый пост в posts в массив модели
    });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.json({ message: 'не удалось создать статью create' });
  }
};
//получение всех постов
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt'); //выбирает по дате создания
    const popularPosts = await Post.find().limit(5).sort('-vievs'); //выбирает 5 постов по количеству просмотров

    if (!posts) {
      return res.json({ message: 'нет постов' });
    }
    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({ message: 'что-то пошло не так' });
  }
};
//получение одного поста по его id
//getById выполнится после того как произойдет get запрос по адресу http://localhost:3002/api/posts/:id
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { vievs: 1 }, //$inc прибавляет к vievs единицу при каждом запросе на кликнутый пост
    });
    //console.log(post);//весь объект поста из БД
    res.json(post);
  } catch (error) {
    res.json({ message: 'Чтото пошло не ттак' });
  }
};
//получение всех постов конкретного пользователя
//http://localhost:3002/api/posts/user/me
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId });

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};
//удаление одного поста
//http://localhost:3002/api/posts/dg3rfhvhvmkdkkkvm
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id); //кнопка удалить есть только на странице одного поста

    if (!post) return res.json({ message: 'такого поста не существует' });
    res.json({ message: 'пост удален' });
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id }, //удаляет пост из массива постов у пользователя
    });
  } catch (error) {
    console.log(error);
  }
};
//редактирование поста
//http://localhost:3002/api/posts/dg3rfhvhvmkdkkkvm/edit
//updateOne - 1-й параметр: поиск по id поста; 2-й параметр: что будет изменяться в посте
export const editPost = async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        author: req.userId,
      }
    );

    res.json({ message: 'статья изменена' });
  } catch (error) {
    res.json({ message: 'не удалось обновит статью' });
    console.log(error);
  }
};
