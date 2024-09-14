import express from 'express';
import { facilityController } from './facility.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../auth/user.constant';


const router = express.Router();


router.post(
    '/',
    auth(USER_ROLE.user),
    facilityController.createFacility);
    
router.get('/', facilityController.getFacility);
router.delete('/:id', facilityController.deleteFacility);

router.put('/:id', facilityController.updateFacility);

export const facilityRoutes = router;
