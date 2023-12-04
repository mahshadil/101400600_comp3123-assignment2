import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployee() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Inline styles
  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!firstname.trim()) {
      errors.firstname = "First name is required";
      isValid = false;
    }

    if (!lastname.trim()) {
      errors.lastname = "Last name is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
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
        "http://localhost:8002/api/v1/emp/employees",
        {
          firstname,
          lastname,
          email,
        }
      );
      console.log(response.data);
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleCancel = () => {
    // Clear the form or navigate back
    navigate("/employees");
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            style={inputStyle}
          />
          {errors.firstname && (
            <div style={{ color: "red" }}>{errors.firstname}</div>
          )}
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            style={inputStyle}
          />
          {errors.lastname && (
            <div style={{ color: "red" }}>{errors.lastname}</div>
          )}
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Email Id:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            style={inputStyle}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <button type="submit" style={saveButtonStyle}>
          Save
        </button>
        <button type="button" onClick={handleCancel} style={cancelButtonStyle}>
          Cancel
        </button>
      </form>
    </div>
  );
}
export default AddEmployee;
