import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../src/css/SignUpLogIn.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUserLoggedIn, setUserData, BASE_URL } = useOutletContext();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed.");
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUserLoggedIn(true);
      setUserData(data.user);

      navigate(`/${username}/dashboard`);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="container">
      <div className="container-wrapper">
        <h3>Log In</h3>
        <form onSubmit={handleSubmit} className="sign-up-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>{" "}
      </div>
    </div>
  );
};

export default Login;
