import { createContext } from "react";

import { IUser, IAction } from "../../client.types";
import { IAuthContext } from "../types";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export interface IState {
  user: null | IUser;
}

export const initialState: IState = {
  user: null
};

export const AuthContext = createContext<IAuthContext>({
  user: null,
  login: (userData: any) => {},
  logout: () => {}
});

export default (state = initialState, { type, payload }: IAction): IState => {
  switch (type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: payload
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        user: null
      };
    }

    default:
      return state;
  }
};
