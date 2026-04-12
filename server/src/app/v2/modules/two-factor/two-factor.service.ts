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

    await prisma.twoFactorAuth.upsert({
      where: { userId },
      update: {
        totpSecret: secret.base32,
        method: TwoFactorMethod.TOTP,
      },
      create: {
        userId,
        email,
        method: TwoFactorMethod.TOTP,
        totpSecret: secret.base32,
      },
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    return {
      qrCode,
      secret: secret.base32,
    };
  }

  return null;
};

const verifyTotpOtp = async (userId: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "No user found");
  }

  const twoFactorAuth = await prisma.twoFactorAuth.findUnique({
    where: { userId },
    select: {
      totpSecret: true,
    },
  });

  if (!twoFactorAuth) {
    throw new AppError(404, "Failed to verify OTP");
  }

  const verified = speakeasy.totp.verify({
    secret: twoFactorAuth.totpSecret as string,
    encoding: "base32",
    token: otp,
    window: 1,
  });

  if (!verified) {
    throw new AppError(400, "Invalid OTP");
  }

  await prisma.twoFactorAuth.update({
    where: { userId },
    data: {
      isEnabled: true,
      method: TwoFactorMethod.TOTP,
    },
  });
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

  console.log({
    to: email,
    subject: "Two-factor authentication",
    templateName: "otp-email",
    templateData: { otp, otpExpiresInMinutes: 10 },
  });

  try {
    await sendEmail({
      to: email,
      subject: "Two-factor authentication",
      templateName: "otp-email",
      templateData: { otp, otpExpiresInMinutes: 10 },
    });
  } catch (error) {
    console.log(error);
    throw new AppError(500, "Error sending OTP");
  }

  return otpDoc;
};

const verifyEmailOtp = async (
  userId: string,
  otp: string,
  docId: string,
  method: TwoFactorMethod = TwoFactorMethod.EMAIL,
) => {
  const doc = await prisma.oTP.findUnique({ where: { id: docId } });
  if (!doc) {
    throw new AppError(400, "Otp not found");
  }
  if (doc.userId !== userId) {
    throw new AppError(403, "Invalid otp");
  }
  if (doc.expiresAt < new Date(Date.now())) {
    throw new AppError(400, "Otp expired. Please request a new one");
  }
  const isMatch = await bcrypt.compare(otp, doc.otp);
  if (!isMatch) {
    throw new AppError(400, "Invalid otp");
  }

  const f2a = await prisma.twoFactorAuth.upsert({
    where: {
      userId: doc.userId,
    },
    create: {
      email: doc.email,
      userId: doc.userId,
      method,
      isEnabled: true,
    },
    update: {
      email: doc.email,
      method,
      isEnabled: true,
    },
  });

  await prisma.oTP.deleteMany({
    where: {
      userId: doc.userId,
    },
  });
  return true;
};

const disable2FA = async (userId: string) => {
  const data = await prisma.twoFactorAuth.update({
    where: {
      userId,
    },
    data: {
      isEnabled: false,
    },
  });

  console.log(data);
  return data;
};

const get2FA = async (userId: string) => {
  return await prisma.twoFactorAuth.findUnique({ where: { userId } });
};

export const TwoFactorService = {
  enable2FA,
  sendOtp,
  verifyEmailOtp,
  verifyTotpOtp,
  disable2FA,
  get2FA,
};
