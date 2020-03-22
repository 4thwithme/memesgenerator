import * as mongoose from "mongoose";

import { IUser } from 'app/types';

const model = mongoose.model;
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model<IUser>('User', userSchema);