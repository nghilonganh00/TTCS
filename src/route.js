import express from 'express';

import AuthRouter from './modules/auth/auth.route';
import UserRouter from './modules/user/user.route';
import ExamRouter from './modules/exam/exam.route';
import ExamHistoryRouter from './modules/examHistory/examHistory.route';
import CommentRouter from './modules/comment/comment.route';
import StatisticRouter from './modules/statistic/statistic.route';

let router = express.Router();

let initWebRoutes = (app) => {
  router.use('/api/auth', AuthRouter);
  router.use('/api/exam', ExamRouter);
  router.use('/api/examHistory', ExamHistoryRouter);
  router.use('/api/comment', CommentRouter);
  router.use('/api/users', UserRouter);
  router.use('/api/statistic', StatisticRouter);

  return app.use('/', router);
};

module.exports = initWebRoutes;
