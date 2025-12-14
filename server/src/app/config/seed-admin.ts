import { UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";
import { envVars } from "./env";

export const seedAdmin = async () => {
  try {
    const isExistAdmin = await User.find({ role: UserRole.ADMIN });
    if (isExistAdmin.length > 0) {
      console.log("an admin already exists.");
      return;
    }

    await User.create({
      name: envVars.ADMIN_NAME,
      email: envVars.ADMIN_EMAIL,
      password: envVars.ADMIN_PASSWORD,
      role: UserRole.ADMIN,
    });
    console.log("admin created.");
  } catch (error) {
    console.log(error);
  }
};
