
import express from 'express';
import { bookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.constant';



const router = express.Router();



router.post(
    '/',
    auth(USER_ROLE.user),
    bookingController.createBooking);
router.get(
    '/',
    auth(USER_ROLE.user),
    bookingController.getBooking);

export const booking = router;
