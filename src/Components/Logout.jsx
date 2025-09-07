import React from 'react';
import axios from 'axios'; // Don't forget to import axios
import variables from '../../variables';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const endpoint = variables.apiUrl + "authentication/logout";

    try {
      const authUserString = sessionStorage.getItem("authUser");

      if (!authUserString) {
        sessionStorage.removeItem("authUser");
        navigate('/');
        return;
      }
      
      const authUser = JSON.parse(authUserString);
      
      // Use the correct axios syntax
      const res = await axios.post(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      
      if (res.status === 200) {
        sessionStorage.removeItem("authUser");
        navigate('/');
      }
      
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails on the server, we should clear the local session for a better user experience
      sessionStorage.removeItem("authUser");
      navigate('/');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;