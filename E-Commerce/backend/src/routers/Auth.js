import express from "express";
import helpers from '../helpers/jwt.js';
import Auth from '../controllers/Auth.js';


const router = express.Router();
router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.post('/refresh_token', Auth.refreshToken);
router.post('/logout', Auth.logout);
router.get('/me', helpers.verifyAccessToken, Auth.isMe);

export default router;