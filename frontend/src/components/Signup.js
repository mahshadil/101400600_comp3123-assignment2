import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8002/api/v1/user/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log("Signup Successful:", response.data);

      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={inputStyle}
        />
        {errors.username && (
          <div style={{ color: "red" }}>{errors.username}</div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={inputStyle}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={inputStyle}
        />
        {errors.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )}

        <button type="submit" style={buttonStyle}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
