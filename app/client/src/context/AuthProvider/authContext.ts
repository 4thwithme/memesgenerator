import { IUser, IAction } from "../../client.types";
import JwtDecode from "jwt-decode";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export interface IInitialState {
  user: null | IUser;
}

const setInitialUserValue = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken: any = JwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
      return null;
    } else {
      return decodedToken;
    }
  }
};

export const initialState: IInitialState = {
  user: setInitialUserValue()
};

export default (state = initialState, { type, payload }: IAction): IInitialState => {
  switch (type) {
    case USER_LOGIN: {
      console.log("action: USER_LOGIN, payload:", payload);
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
