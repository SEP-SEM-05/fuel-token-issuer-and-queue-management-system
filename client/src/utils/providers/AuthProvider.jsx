import React, { useContext, createContext, useState, useEffect } from "react";

const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  const signUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (!user) {
      const _user = JSON.parse(localStorage.getItem("user"));
      if (_user) {
        setUser(_user);
      }
    }
  }, []);

  const values = {
    user,
    signUser,
  };

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
}
