import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("metadata",JSON.stringify(formData));
    navigate("/test");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
      >
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

        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
