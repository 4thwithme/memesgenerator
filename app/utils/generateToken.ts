import * as jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/jwtSecret";

import { IUser } from "app/types";

export default (user: IUser): string =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
