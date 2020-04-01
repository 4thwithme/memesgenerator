import { AnyObject } from "../client.types";

export default (object: AnyObject): boolean => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
