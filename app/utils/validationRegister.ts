import { IValidationInput, StringObject } from "../types";

export default (
  username: string,
  password: string,
  confirmPassword: string,
  email: string
): IValidationInput => {
  const errors: StringObject = {};

  if (username.trim() === "") {
    errors.username = "Username should be not empty";
  }

  if (password === "") {
    errors.password = "Password should be not empty";
  } else if (password.trim() !== confirmPassword.trim()) {
    errors.username = "Password should be not empty";
  }

  if (email === "") {
    errors.username = "Email should be not empty";
  } else {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(regEx)) {
      errors.email = "Email must be a valid";
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length < 1
  };
};
