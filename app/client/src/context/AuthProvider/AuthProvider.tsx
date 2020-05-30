import React, { useReducer } from "react";

import { IUser } from "../../client.types";
import authReducer, { initialState, USER_LOGOUT, USER_LOGIN, AuthContext } from "./authContext";

const AuthProvider = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: IUser) => dispatch({ type: USER_LOGIN, payload: userData });

  const logout = () => dispatch({ type: USER_LOGOUT });

  return <AuthContext.Provider {...props} value={{ user: state.user, login, logout }} />;
};

export default AuthProvider;
