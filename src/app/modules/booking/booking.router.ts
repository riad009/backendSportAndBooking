
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
    auth(USER_ROLE.admin),
    bookingController.getBooking);

router.delete(
    '/:id',
    auth(USER_ROLE.user),
    bookingController.deleteBooking);

router.get(
    '/user',
    auth(USER_ROLE.user),
    bookingController.getBookingByUser);
// router.get(
//      '/check-availability',
//     // auth(USER_ROLE.user),
//     bookingController.getbookingAvailability);

export const booking = router;
