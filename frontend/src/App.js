import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee"; // Import your ViewEmployee component
import UpdateEmployee from "./components/UpdateEmployee"; // Import your UpdateEmployee component
import Logout from "./components/Logout";

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const navStyle = {
    backgroundColor: "#004085",
    padding: "10px 0",
    marginBottom: "30px",
  };

  const navListStyle = {
    listStyleType: "none",
    display: "flex",
    justifyContent: "center",
  };

  const navItemStyle = {
    margin: "0 10px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  };
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={navStyle}>
          <ul style={navListStyle}>
            <li style={navItemStyle}>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/signup" style={linkStyle}>
                Signup
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/logout" style={linkStyle}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-employee/:id"
            element={
              <PrivateRoute>
                <ViewEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/update-employee/:id"
            element={
              <PrivateRoute>
                <UpdateEmployee />
              </PrivateRoute>
            }
          />
          {/* Default Redirect to Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
