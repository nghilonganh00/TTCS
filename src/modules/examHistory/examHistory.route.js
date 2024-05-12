import express from 'express';
import examHistoryController from './examHistory.controller';

let router = express.Router();

router.get('/previews', examHistoryController.handleGetAllPreview);
router.get('/:id', examHistoryController.handleGetById);

export default router;
