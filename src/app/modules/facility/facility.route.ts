import express from 'express';
import { facilityController } from './facility.controller';


const router = express.Router();


router.post('/', facilityController.createFacility);
router.get('/', facilityController.getFacility);
router.delete('/:id', facilityController.deleteFacility);

export const facilityRoutes = router;
