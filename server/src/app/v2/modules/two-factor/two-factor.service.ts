import speakeasy from "speakeasy";
import QRCode from "qrcode";
import bcrypt from "bcryptjs";

import {
  OTPType,
  TwoFactorMethod,
} from "../../../../../prisma/generated/enums";
import prisma from "../../../config/db";
import AppError from "../../../helpers/appError";
import { generateOtp } from "../../../helpers/generate-otp";
import { sendEmail } from "../../../utils/sendEmail";

const enable2FA = async (
  userId: string,
  email: string,
  method: TwoFactorMethod,
) => {
  if (method === TwoFactorMethod.TOTP) {
    const secret = speakeasy.generateSecret({
      name: `TourBuddy (${email})`,
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url as string);

    return {
      qrCode,
      secret: secret.base32,
    };
  }

  return null;
};

const sendOtp = async (userId: string, email: string, docId: string | null) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  const otp = generateOtp(6);

  const hashedOtp = await bcrypt.hash(otp, 10);

  let otpDoc;
  if (docId) {
    const doc = await prisma.oTP.findUnique({ where: { id: docId } });
    if (doc) {
      otpDoc = await prisma.oTP.update({
        where: {
          id: docId,
        },
        data: {
          otp: hashedOtp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
      return otpDoc;
    } else {
      await prisma.oTP.deleteMany({
        where: {
          expiresAt: {
            lte: new Date(Date.now()),
          },
        },
      });
      otpDoc = await prisma.oTP.create({
        data: {
          userId,
          email,
          otp: hashedOtp,
          type: OTPType.TWO_FACTOR,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
    }
  } else {
    await prisma.oTP.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(Date.now()),
        },
      },
    });
    otpDoc = await prisma.oTP.create({
      data: {
        userId,
        email,
        otp: hashedOtp,
        type: OTPType.TWO_FACTOR,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
  }

  if (!otpDoc) {
    throw new AppError(500, "Error sending OTP");
  }

  try {
    await sendEmail({
      to: email,
      subject: "Two-factor authentication",
      templateName: "otp-email",
      templateData: { otp, otpExpiresInMinutes: 10 },
    });
  } catch (error) {
    throw new AppError(500, "Error sending OTP");
  }

  return otpDoc;
};

export const TwoFactorService = { enable2FA, sendOtp };
