import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import variables from "../../variables";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validate = async () => {
      try {
        const authUserString = sessionStorage.getItem("authUser");

        if (!authUserString) {
          setIsValid(false);
          return;
        }
        const authUser = JSON.parse(authUserString);
        await axios.get(variables.apiUrl + "authentication/validate", {
          headers: { Authorization: `Bearer ${authUser.token}` },
        });

        setIsValid(true);
      } catch {
        sessionStorage.removeItem("authUser");
        setIsValid(false);
      }
    };
    validate();
  }, []);

  if (isValid === null) return <div>Checking your passport...</div>;
  if (!isValid) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
