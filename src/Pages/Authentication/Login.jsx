import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import variables from "../../../variables";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = variables.apiUrl + "authentication/login";

    try {
      const res = await axios.post(endpoint, {
        ...formData,
      });

      // The response object is now available
      if (res.status === 200) {
        sessionStorage.setItem("authUser", JSON.stringify(res.data));
        navigate("/test");
      } else {
        // Handle other non-200 success codes if necessary
        console.log(`Received status code: ${res.status}`);
      }
    } catch (error) {
      // The `error.response` object is used for server-side errors (4xx, 5xx)
      if (error.response) {
        console.log("Response error: " + error.response.data);
      } else if (error.request) {
        // `error.request` is for network errors where no response was received
        console.log("Request error: No response received.");
      } else {
        // Other errors, like a problem with the request setup
        console.log("Error: " + error.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}