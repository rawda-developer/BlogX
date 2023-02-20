import express from 'express';
import authCtrl from '../controllers/auth.controller';
const router = express.Router();
router.route('/login').post(authCtrl.login);
router.route('/logout').get(authCtrl.logout);
export default router;
