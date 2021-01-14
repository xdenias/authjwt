import React, { createContext } from "react";

import useAuth from "../useAuth";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    handleSubmit,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        handleSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
