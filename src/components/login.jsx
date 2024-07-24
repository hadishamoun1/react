import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./login.css";
import { TweenMax, Power3 } from "gsap";
import { Tween } from "gsap/gsap-core";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/react/recipe-app/src/components/login.php",
        {
          username,
          password,
        }
      );
      if (response.data.success) {
        sessionStorage.setItem("user_id", response.data.user_id);
        window.location.href = "/main";
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  let logoItem = useRef(null);
  useEffect(() => {
    TweenMax.to(logoItem, 0.8, {
      opacity: 1,
      y: -80,
      ease: Power3.easeOut,
    });
  });

  return (
    <div className="login-container">
      <form
        ref={(el) => {
          logoItem = el;
        }}
        onSubmit={handleLogin}
        className="login-form"
      >
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
