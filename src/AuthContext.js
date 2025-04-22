import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    setIsAuthenticated(true);
    setUser({ username, password });

    localStorage.setItem("currentUser", JSON.stringify({ username, password }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("currentUser");
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
