import { JwtPayload } from "jsonwebtoken";
import AppError from "../../helpers/appError";
import { QueryBuilder } from "../../middlewares/queryBuilder";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { IUser, UserRole } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcryptjs";

const getAllUsers = async (queries: Record<string, string>) => {
  const builder = new QueryBuilder<IUser>(User, {
    ...queries,
    isDeleted: "false",
    role: "TOURIST",
  });
  const res = await builder
    .filter()
    .search(["email", "name", "phone"])
    .paginate()
    .select(["-password"])
    .execWithMeta();

  return { users: res.data, meta: res.meta };
};

const getUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  console.log(user);
  return user;
};

const createUser = async (payload: Partial<IUser>): Promise<IUser> => {
  const { email, ...res } = payload;

  // check if user already exist
  const isExists = await User.findOne({ email });

  if (isExists && isExists.isDeleted) {
    const updatedUser = await User.findOneAndUpdate({ email }, res, {
      context: "query",
      new: true,
    });

    return updatedUser!;
  }

  if (isExists && isExists.isBlocked) {
    throw new AppError(
      HTTP_STATUS.BAD_REQUEST,
      "User account has blocked. Please contact with admin"
    );
  }

  if (isExists) {
    throw new AppError(
      HTTP_STATUS.CONFLICT,
      "User already exist with this email."
    );
  }

  const user = await User.create({ email, ...res });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser> & { currentPassword?: string },
  loggedInUser: JwtPayload
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }
  if (payload.email) {
    throw new AppError(HTTP_STATUS.FORBIDDEN, "You can't update email.");
  }

  if (loggedInUser.role !== UserRole.ADMIN) {
    if (user.isDeleted || user.isBlocked) {
      throw new AppError(HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
    }

    if (payload.role === UserRole.ADMIN) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "Your not authorized to update role."
      );
    }

    // if (payload.isBlocked || payload.isVerified) {
    //   throw new AppError(
    //     HTTP_STATUS.FORBIDDEN,
    //     "Your not authorized to update status."
    //   );
    // }
  }

  if (payload.password) {
    const isMatchPass = await bcrypt.compare(
      payload?.currentPassword as string,
      user.password as string
    );
    if (!isMatchPass) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid password.");
    }
  }

  return await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};

const updateUserRole = async (userId: string, role: "SENDER" | "RECEIVER") => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }
  if (user.role === UserRole.ADMIN) {
    throw new AppError(HTTP_STATUS.FORBIDDEN, "You can't update role.");
  }

  return await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );
};

const deleteUser = async (loggedInUser: JwtPayload, userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  if (
    user.role === UserRole.ADMIN &&
    user.adminInfo?.permissions.includes("DELETE_USER")
  ) {
    throw new AppError(
      HTTP_STATUS.FORBIDDEN,
      "You are not authorized to delete this user."
    );
  }

  if (loggedInUser.role !== UserRole.ADMIN) {
    if (loggedInUser.userId !== user._id.toString()) {
      throw new AppError(
        HTTP_STATUS.FORBIDDEN,
        "You are not authorized to delete this user."
      );
    }

    if (user.isDeleted || user.isBlocked) {
      throw new AppError(HTTP_STATUS.FORBIDDEN, "User is blocked or deleted.");
    }
  }

  return await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true, runValidators: true }
  );
};

export const UserService = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
};
