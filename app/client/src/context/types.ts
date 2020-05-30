import { IUser } from "../client.types";

export interface IAuthContext {
  user: null | IUser;
  login: (userData: IUser) => void;
  logout: () => void;
}
