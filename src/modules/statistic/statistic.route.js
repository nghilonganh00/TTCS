import express from 'express';
import statisticController from './statistic.controller';

let router = express.Router();

router.get('/', statisticController.statisticByUserId);
router.get('/part/:part', statisticController.statisticByPart);
router.get('/exam/:id', statisticController.statisticByExamId);

export default router;
