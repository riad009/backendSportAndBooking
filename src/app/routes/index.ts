import { Router } from 'express';


import { StudentRoutes } from '../modules/user/user.route';
import { facilityRoutes } from '../modules/facility/facility.route';
import { AuthRouter } from '../modules/auth/auth.router';


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
 

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
