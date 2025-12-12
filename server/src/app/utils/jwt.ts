import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateJwt = (
  payload: JwtPayload,
  secret: string,
  expiresIn?: string
) =>
  jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);

export const verifyJwt = (token: string, secret: string) =>
  jwt.verify(token, secret);
