import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication data
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // Render nothing as this component is just for processing the logout
}

export default Logout;
