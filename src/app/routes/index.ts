import { Router } from 'express';


import { StudentRoutes } from '../modules/user/user.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { AuthRouter } from '../modules/auth/auth.router';
import { booking } from '../modules/booking/booking.router';


const router = Router();

const moduleRoutes = [

  {
    path: '/facility',
    route: facilityRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
 
  {
    path: '/bookings',
    route: booking,
  },
 

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
