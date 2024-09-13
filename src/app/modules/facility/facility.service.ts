import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";



const createFacilityInDB = async (studentData: TFacility) => {
  // Create a new student record in the database
  const result = await Facility.create(studentData);
  return result;
};

const getAllFacilityInDb = async () => {
  const result = await Facility.find({ isDeleted: false }); // Filter to get only facilities where isDeleted is false
  return result;
};

// Facility Service
const deleteFacilityFromDB = async (id:string) => {
  console.log('id', id); // This should now print the 'id' correctly
  const result = await Facility.findOneAndUpdate(
    { _id: id }, // Find the facility by its _id
    { isDeleted: true }, // Set isDeleted to true
    { new: true } // Return the updated document
  );
  return result;
};


export const FacilityService = {
  createFacilityInDB,
  getAllFacilityInDb,
  deleteFacilityFromDB,
  
};
