import Navbar from "./Nav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserLoggedIn(true);
      setUserData(user);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  function logOut() {
    if (userLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserLoggedIn(false);

      navigate("/");
    }
  }
  return (
    <div className="container">
      <Navbar
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        userData={userData}
        logOut={logOut}
      />{" "}
      <div>Welcome to your Dashboard.</div>
    </div>
  );
};

export default Dashboard;
