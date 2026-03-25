import { paginationHelper } from "../../../helpers/paginationHelper";
import { pick } from "../../../helpers/pick";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req, res, next) => {
  const options = pick(req.query, paginationHelper.paginationFields);
  const filters = pick(req.query, [
    "searchTerm",
    "role",
    "country",
    "city",
    "topGuides",
  ]);

  const data = await UserService.getAllUserFromDB(options, filters);
  sendResponse(res, {
    message: "Users fetched successfully",
    statusCode: 200,
    success: true,
    meta: data.meta,
    data: data.data,
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    message: "User fetched successfully",
    statusCode: 200,
    success: true,
    data: await UserService.getSingleUserFromDB(req.params.id),
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const data = await UserService.createUserInDB(req.body);

  sendResponse(res, {
    message: "User created successfully",
    statusCode: 201,
    success: true,
    data,
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const data = await UserService.updateUserInDB(
    req.params.id,
    req.body,
    req.files as {
      [fieldname: string]: Express.Multer.File[];
    },
  );

  sendResponse(res, {
    message: "User updated successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const hardDeleteUser = catchAsync(async (req, res, next) => {
  const data = await UserService.hardDeleteUser(req.params.id);
  sendResponse(res, {
    message: "User deleted successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const softDeleteUser = catchAsync(async (req, res, next) => {
  const data = await UserService.softDeleteUser(req.params.id);
  sendResponse(res, {
    message: "User deleted successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const addEmergencyContact = catchAsync(async (req, res, next) => {
  const data = await UserService.addEmergencyContact(req.params.id, req.body);
  sendResponse(res, {
    message: "Emergency contact added successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const removeEmergencyContact = catchAsync(async (req, res, next) => {
  const data = await UserService.deleteEmergencyContact(req.params.id);
  sendResponse(res, {
    message: "Emergency contact removed successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const getEmergencyContact = catchAsync(async (req, res, next) => {
  const data = await UserService.getEmergencyContact(req.params.id);
  sendResponse(res, {
    message: "Emergency contact fetched successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

const updateEmergencyContact = catchAsync(async (req, res, next) => {
  const data = await UserService.updateEmergencyContact(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    message: "Emergency contact updated successfully",
    statusCode: 200,
    success: true,
    data,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  hardDeleteUser,
  softDeleteUser,
  addEmergencyContact,
  removeEmergencyContact,
  getEmergencyContact,
  updateEmergencyContact,
};
