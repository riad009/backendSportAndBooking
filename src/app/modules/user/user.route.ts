import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './user.controller';

const router = express.Router();


router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
