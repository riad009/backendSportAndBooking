import { User } from "./user.model";



const getAllStudentsFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await User.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
