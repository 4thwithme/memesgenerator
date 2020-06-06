import { StringObject } from "../../client.types";

export default (values: StringObject) => {
  const errors: StringObject = {};

  if (!values.username || values.username.trim().length === 0) {
    errors.username = "Fill username field";
  } else if (!values.username || values.username.trim().length < 3) {
    errors.username = "username must be 3+ char";
  }
  if (!values.password || values.password.trim() === "") {
    errors.password = "Fill password field";
  } else if (!values.password || values.password.trim().length < 4) {
    errors.password = "password must be 4+ char";
  }

  return errors;
};
