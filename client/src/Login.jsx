import { useState } from "react";
import Navbar from "./Nav";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
      const response = await fetch("http://localhost:3000/login", {
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

      navigate(`/${username}/dashboard`);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Hello from login page!</h1>
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
  );
};

export default Login;