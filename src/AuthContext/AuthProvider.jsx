import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = sessionStorage.getItem("admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  // Remove navigate from here
  const Adminlogin = (loggedInAdmin) => {
    setAdmin(loggedInAdmin);
    sessionStorage.setItem("admin", JSON.stringify(loggedInAdmin));
  };

  const Userlogin = (loggedInUser) => {
    setUser(loggedInUser);
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
  };

  const Adminlogout = () => {
    setUser(null);
    setAdmin(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  const Userlogout = () => {
    setUser(null);
    setAdmin(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };



  return (
    <AuthContext.Provider value={{ user, admin, Adminlogin, Userlogin ,Adminlogout, Userlogout }}>
      {children}
    </AuthContext.Provider>
  );
};
