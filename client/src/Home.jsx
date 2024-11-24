import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Posts from "./Posts";

function App() {
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

  // Set conditional render if logged in to show the User Dashboard, or the posts homepage if not logged in.

  return (
    <>
      <Posts />
    </>
  );
}

export default App;
