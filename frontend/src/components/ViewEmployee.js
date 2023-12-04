import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewEmployee() {
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8002/api/v1/emp/employees/${id}`
        );
        setEmployee(result.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        // Handle error
      }
    };

    fetchEmployee();
  }, [id]);

  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
  };

  const headerStyle = {
    textAlign: "center",
    margin: "0",
    padding: "10px 0",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px 5px 0 0",
  };

  const detailStyle = {
    margin: "10px 0",
    padding: "5px",
    borderBottom: "1px solid #ccc",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>View Employee Details</h2>
      <div style={detailStyle}>
        <strong>Employee First Name:</strong> {employee.firstname}
      </div>
      <div style={detailStyle}>
        <strong>Employee Last Name:</strong> {employee.lastname}
      </div>
      <div style={detailStyle}>
        <strong>Employee Email ID:</strong> {employee.email}
      </div>
    </div>
  );
}

export default ViewEmployee;
