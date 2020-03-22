import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/jwtSecret";

export default (context: any): object | string => {
  const authHeader = context.req.headers.auth;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        return jwt.verify(token, JWT_SECRET);
      } catch (err) {
        throw new Error("Invalid/Expired token");
      }
    } else {
      throw new Error('Token must be "Bearer [token]" ');
    }
  } else {
    throw new Error("Authorization must be provided");
  }
};
