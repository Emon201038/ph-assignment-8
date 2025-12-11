import AppError from "../../helpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getUsers = catchAsync(async (req, res, next) => {
  const { users, meta } = await UserService.getAllUsers(
    req.query as Record<string, string>
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "users retrieved successfully",
    data: { users, meta },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "user created successfully",
    data: UserService.createUser(req.body),
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const isValidId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
  if (!isValidId) throw new AppError(400, "Invalid user id.");
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user retrieved successfully",
    data: UserService.getUser(req.params.id),
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user updated successfully",
    // Todo : update user
    data: UserService.updateUser(req.params.id, req.body, {}),
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user deleted successfully",
    data: {},
  });
});

export const UserController = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
