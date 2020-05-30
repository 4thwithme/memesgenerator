import * as mongoose from "mongoose";

import { IUser } from "../types";

const { model, Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

export default model<IUser>("User", userSchema);
