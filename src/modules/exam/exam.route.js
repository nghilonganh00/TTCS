import express from 'express';
import examController from './exam.controller';

let router = express.Router();

router.get('/preview', examController.getPreviewExam);
router.get('/getById', examController.getDetailExamById);
router.post('', examController.addExam);
router.put('', examController.editExam);
router.delete('', examController.deleteExam);
router.post('/grade', examController.gradeExam);
router.get('/:id/part/:part/question_id/:question_id', examController.getQuestionById);

export default router;
