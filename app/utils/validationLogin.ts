import { IValidationInput, StringObject } from "../types";

export default (username: string = "", password: string = ""): IValidationInput => {
  const errors: StringObject = {};

  if (username.trim() === "") {
    errors.username = "Username should be not empty";
  }

  if (password.trim() === "") {
    errors.password = "Password should be not empty";
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  };
};
