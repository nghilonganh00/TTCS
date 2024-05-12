import express from 'express';
import authController from './auth.controller';

let router = express.Router();

router.post('/sign-in', authController.handleSignIn);
router.post('/sign-up', authController.handleSignUp);

export default router;
