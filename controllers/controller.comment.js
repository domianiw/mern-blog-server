import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

//функция создания коммента
export const create = async (req, res) => {
  try {
    //postId, comment будем получать из тела запроса фронтэнда
    const newComment = new Comment({
      postId: req.body.postId,
      comment: req.body.comment,
    });

    if (!req.body.comment) return res.json({ message: 'коммент не модет быть пустым' });

    const comment = await newComment.save();

    await Post.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment._id },
    });

    res.json(comment);
  } catch (error) {
    res.json({ message: 'чтой-то не так' });
  }
};
//функция получения всех комментов к конкрентному посту
export const getComment = async (req, res) => {
  try {
    const list = await Comment.find({ postId: req.params.id });

    res.json(list);
  } catch (error) {
    res.json({ message: 'комент не найден' });
  }
};
