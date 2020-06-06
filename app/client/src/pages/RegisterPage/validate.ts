import { StringObject } from "../../client.types";

export default (values: StringObject) => {
  const errors: StringObject = {};

  if (!values.username || values.username.trim().length === 0) {
    errors.username = "Fill username field";
  } else if (values.username && values.username.trim().length < 3) {
    errors.username = "username must be 3+ char";
  }
  if (!values.password || values.password.trim() === "") {
    errors.password = "Fill password field";
  } else if (!values.password || values.password.trim().length < 4) {
    errors.password = "password must be 4+ char";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Paswords are not equal";
  }
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email should be not empty";
  } else {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email && !values.email.match(regEx)) {
      errors.email = "Email must be a valid";
    }
  }
  return errors;
};
