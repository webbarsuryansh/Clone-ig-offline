import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login success:", res.data);

      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        setError(err.response.data.message || "Invalid username or password");
      } else {
        setError("Server is not running");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-main">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-title">Login</h1>

          <input
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            name="username"
            required
          />

          <input
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;