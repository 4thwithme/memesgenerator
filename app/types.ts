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

export interface IMem extends mongoose.Document {
  file: string;
  name: string;
  memSrc: string;
  createdAt: string;
  author: string | IUser;
  tags: string[];
}

export interface IMemModel extends mongoose.Model<IMem> {
  uploadFileToAWS(internalUrl: string | null, file: File, callback: (a: object) => void): string;
}

export interface IArgMemInfo {
  file: any;
  name: string;
  memSrc: string;
  createdAt: number;
  author: string;
  internalUrl: string | null;
  tags: string[];
}

export interface IArgsGetMemes {
  author: string;
  limit: number;
  offset: number;
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

export interface IValidationInput {
  errors: StringObject;
  isValid: boolean;
}
