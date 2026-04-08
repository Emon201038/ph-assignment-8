import bcrypt from "bcryptjs";
import prisma from "../../../config/db";
import { SendOtpSchema } from "./otp.validation";
import { generateOtp } from "../../../helpers/generate-otp";
import AppError from "../../../helpers/appError";

const sendOtp = async (payload: SendOtpSchema) => {
  const otp = generateOtp(6);

  let userId: string;
  let email: string | undefined;

  if (payload.email) {
    email = payload.email;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    userId = user.id;
  } else if (payload.userId) {
    userId = payload.userId;
  } else {
    throw new AppError(400, "Email or userId is required");
  }

  const hashedOtp = await bcrypt.hash(otp, 10);
  console.log({ otp });

  const otpDoc = await prisma.oTP.upsert({
    where: {
      id: userId,
      type: payload.type,
    },
    create: {
      userId,
      otp: hashedOtp,
      type: payload.type,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
    update: {
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  return otpDoc;
};
export const OtpService = { sendOtp };
