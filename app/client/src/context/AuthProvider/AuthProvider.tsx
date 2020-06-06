import React, { useReducer, createContext } from "react";
import { useHistory } from "react-router-dom";

import authReducer, { initialState, USER_LOGOUT, USER_LOGIN } from "./authContext";

import { IUser, IAuthContext } from "../../client.types";

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: (userData: any) => {},
  logout: () => {}
});

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const history = useHistory();

  const login = (userData: IUser) => {
    localStorage.setItem("jwtToken", userData.token);
    history.push("/");
    dispatch({ type: USER_LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: USER_LOGOUT });
  };

  return <AuthContext.Provider {...props} value={{ user: state.user, login, logout }} />;
};

export { AuthProvider, AuthContext };
