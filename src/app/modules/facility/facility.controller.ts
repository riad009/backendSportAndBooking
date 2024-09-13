import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityService } from './facility.service';



// Handler to create a new student
const createFacility: RequestHandler = catchAsync(async (req, res) => {
    const studentData = req.body; // Extract student data from request body

    console.log('studentData',studentData)
    const result = await FacilityService.createFacilityInDB(studentData);
   
    // sendResponse(res, {
    //   statusCode: httpStatus.CREATED,
    //   success: true,
    //   message: 'Facility is created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: 200, // Include statusCode in the response
      success: true,
      message: 'User logged in successfully',
      // token: "JWT_TOKEN",
      data: {
        _id: result._id,
        name: result.name,
        email: result.description,
        role: result.pricePerHour,
        phone: result.location,
        address: result.isDeleted,
      },
    });
  });

  const getFacility: RequestHandler = catchAsync(async (req, res) => {
    const result = await FacilityService.getAllFacilityInDb();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility are retrieved succesfully',
      data: result,
    });
  });

  const deleteFacility = catchAsync(async (req, res) => {
    const { id } = req.params;

   
    const result = await FacilityService.deleteFacilityFromDB(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility deleted successfull',
      data: result,
    });
  });
  

export const facilityController = {
    createFacility,
    getFacility,
    deleteFacility,
};
