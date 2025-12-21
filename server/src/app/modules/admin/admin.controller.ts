import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

const createUser = catchAsync(async (req, res, next) => {
  const user = await AdminService.createUser(req);
  sendResponse(res, {
    message: req.body.rol + " created successfully",
    statusCode: 201,
    success: true,
    data: user,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await AdminService.deleteUser(req);
  sendResponse(res, {
    message: "User deleted successfully",
    statusCode: 200,
    success: true,
    data: user,
  });
});

export const AdminController = { createUser, deleteUser };
