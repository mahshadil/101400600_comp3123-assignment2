import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateEmployee() {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8002/api/v1/emp/employees/${id}`
        );
        console.log(result.data);
        setEmployee(result.data);
        console.log(employee);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        // Handle error
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  useEffect(() => {
    console.log(employee);
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
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

  const buttonStyle = {
    padding: "10px 20px",
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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8002/api/v1/emp/employees/${id}`,
        employee
      );
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      // Handle errors here
    }
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  console.log(employee);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Update Employee</h2>
      <form>
        <div style={formGroupStyle}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            First Name:
          </label>
          <input
            type="text"
            name="firstname"
            value={employee.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Last Name:
          </label>
          <input
            type="text"
            name="lastname"
            value={employee.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email Id:
          </label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            style={inputStyle}
          />
        </div>
        <button onClick={handleSave} style={saveButtonStyle}>
          Save
        </button>
        <button onClick={handleCancel} style={cancelButtonStyle}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
