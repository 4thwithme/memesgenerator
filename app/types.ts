import * as mongoose from "mongoose";

export type AnyObject = { [key: string]: any };
export type StringObject = { [key: string]: string };

export interface IRegisterInput {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface IArgRegisterInput {
  registerInput: IRegisterInput;
}

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  createdAt: string;
}

export interface IUserWithToken extends IUser {
  token: string;
}

export interface IComment {
  body: string;
  username: string;
  createdAt: string;
}

export interface ILikes {
  username: string;
  createdAt: string;
}

export interface IValidationInput {
  errors: StringObject;
  isValid: boolean;
}
