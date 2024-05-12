import express from 'express';
import commentController from './comment.controller';

let router = express.Router();

router.get('/getByExamId', commentController.getCommentByExamId);
router.get('/getByUserId', commentController.getCommentByUserId);
router.post('/add', commentController.handleAddComment);

export default router;
