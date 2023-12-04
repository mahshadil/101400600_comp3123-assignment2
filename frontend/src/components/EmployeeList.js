import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Styles for the table and buttons
  const tableStyle = {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  };

  const thStyle = {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#004085",
    color: "white",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ffc107",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    color: "white",
  };

  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#17a2b8",
    color: "white",
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8002/api/v1/emp/employees"
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8002/api/v1/emp/employees/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <button style={buttonStyle} onClick={() => navigate("/add-employee")}>
        Add Employee
      </button>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Employee First Name</th>
            <th style={thStyle}>Employee Last Name</th>
            <th style={thStyle}>Employee Email Id</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td style={tdStyle}>{employee.firstname}</td>
              <td style={tdStyle}>{employee.lastname}</td>
              <td style={tdStyle}>{employee.email}</td>
              <td style={tdStyle}>
                <button
                  style={updateButtonStyle}
                  onClick={() => navigate(`/update-employee/${employee._id}`)}
                >
                  Update
                </button>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
                <button
                  style={viewButtonStyle}
                  onClick={() => navigate(`/view-employee/${employee._id}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
