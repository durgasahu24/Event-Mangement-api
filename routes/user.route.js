import express from 'express';
import { createNewUser, getUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/', createNewUser);
router.get('/:id', getUser);

export default router;
