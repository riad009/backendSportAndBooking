import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityService } from './facility.service';




const createFacility: RequestHandler = catchAsync(async (req, res) => {
    const FacilityData = req.body; // Extract student data from request body

    console.log('studentData',FacilityData)
    const result = await FacilityService.createFacilityInDB(FacilityData);
   
    sendResponse(res, {
      statusCode: 200, // Include statusCode in the response
      success: true,
      message: 'Facility added successfully',
     
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

  if (result.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility are retrieved successfully',
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
  
  const updateFacility = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body; // Extract updateData from the request body
  
    const result = await FacilityService.updateFacilityFromDB(id, updateData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility updated successfully',
      data: result,
    });
  });
  
  

export const facilityController = {
    createFacility,
    getFacility,
    deleteFacility,
    updateFacility,
};
