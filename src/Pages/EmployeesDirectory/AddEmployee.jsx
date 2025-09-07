import React, { useState } from "react";
import {
  generalStringValidator,
  nameValidator,
  numericValidator,
  validateEmail,
} from "../../Utils/FieldsValidator";
import variables from "../../../variables";
import axios from "axios";
import UserHelper from "../../Utils/UserHelper";

const AddEmployee = () => {
  const [error, setError] = useState();
  const [RespMsg, setRespMsg] = useState();
  const endpoint = variables.apiUrl + "v1/employees";
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    nationality: "",
    salary:0.0,
    previousPosition: "",
    currentPosition: "",
    department: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  setError(null);
  setRespMsg(null);

  if (!validateEmail(formData.email)) {
    setError("Enter a valid email address");
    return;
  }
  if (!numericValidator(formData.salary)) {
    setError("Salary should be only numeric value.");
    return;
  }
  if (!nameValidator(formData.fullName)) {
    setError(
      "Full name should be at least 9 characters and cannot contain numbers or special characters."
    );
    return;
  }
  if (
    !generalStringValidator(formData.address) ||
    !generalStringValidator(formData.previousPosition) ||
    !generalStringValidator(formData.currentPosition) ||
    !generalStringValidator(formData.department) ||
    !generalStringValidator(formData.nationality)
  ) {
    setError(
      "Consider writing only letters in fields like address, positions, department, and nationality."
    );
    return;
  }

  const token = UserHelper.getToken();
  if (!token) {
    setError("No authorization token found. Please login again.");
    return;
  }

  try {
    const res = await axios.post(endpoint, { ...formData }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200 || res.status === 201) {
      setRespMsg("Employee added successfully!");
      setError(null);
      // optionally clear form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        nationality: "",
        salary: "",
        previousPosition: "",
        currentPosition: "",
        department: "",
      });
    } else {
      setError("Failed to add new employee.");
    }
  } catch (error) {
    console.error(error);
    setError(error.response?.data?.message || error.message || "Server error");
  }
};
  return (
    <div className="masterContainer">
        
      <div className="formContainer">
        <p>{UserHelper.getToken()}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Previous Position</label>
            <input
              type="text"
              name="previousPosition"
              value={formData.previousPosition}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Current Position</label>
            <input
              type="text"
              name="currentPosition"
              value={formData.currentPosition}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <button type="submit">Add Employee</button>
        </form>
      </div>
      <div className="errorContainer">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {RespMsg && <p style={{ color: "green" }}>{RespMsg}</p>}
      </div>
    </div>
  );
};

export default AddEmployee;
