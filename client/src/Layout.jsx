import { useState, useEffect } from "react";
import Navbar from "./Nav";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Layout() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logOut();
      }
      setUserLoggedIn(true);
      setUserData(user);
    } else {
      logOut();
    }
  }, [token]);

  function logOut() {
    setUserLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData({ r });
    navigate("/");
  }

  return (
    <div className="main-container">
      <Navbar
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        userData={userData}
        logOut={logOut}
      />

      <Outlet
        context={{
          BASE_URL,
          userLoggedIn,
          setUserLoggedIn,
          setUserData,
          userData,
          logOut,
        }}
      />
    </div>
  );
}
