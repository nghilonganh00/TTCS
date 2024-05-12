import express from 'express';
import userController from './user.controller';

let router = express.Router();

router.get('/:id', userController.getById);
router.put('/:id', userController.updateUser);

export default router;
