import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import variables from "../../../variables";
import { validateEmail, validatePassword } from "../../Utils/FieldsValidator";
import TextType from "../../Components/TextType";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";
import Dock from "../../Components/Dock";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState();
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
    if (!validateEmail(formData.email)) {
      setError("Try again using a correct format for your email");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Try again using a correct format for your password");
      return;
    }

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
  }
  return (
    <div>
      <TextType
        text={["Your Vision, Our Code..."]}
        typingSpeed={100}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
      />
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
        <div className="errorMsg">{error}</div>
      </form>
    </div>
  );
}
