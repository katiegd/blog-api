import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../src/css/SignUpLogIn.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setpassword2(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, password2 }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.msg || "Signup failed.");
        return error;
      }
      navigate("/login");
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    if (password2 && password) {
      if (password2 === password) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  }, [password, password2]);

  return (
    <div className="container">
      <div className="container-wrapper">
        <h2>Sign Up</h2>
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
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            name="password2"
            id="password2"
            value={password2}
            onChange={handleChange}
          />
          {password2 && password && passwordsMatch ? (
            <div className="passwords-match">Passwords match.</div>
          ) : password2 && !(password && password2 && passwordsMatch) ? (
            <div className="passwords-no-match">Passwords do not match.</div>
          ) : null}
          {error && Array.isArray(error) ? (
            <ul>
              error.map((err, index) => (<li key={index}>{err.msg}</li>))
            </ul>
          ) : null}
          <button type="submit">Submit</button>
        </form>{" "}
      </div>
    </div>
  );
};

export default SignUp;
