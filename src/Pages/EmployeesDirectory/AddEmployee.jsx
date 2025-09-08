import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import variables from "../../../variables";
import UserHelper from "../../Utils/UserHelper";
import {
    generalStringValidator,
    nameValidator,
    numericValidator,
    validateEmail,
} from "../../Utils/FieldsValidator";

const EmployeeForm = () => {
  const location = useLocation();
  const { mode = "add", initialData = {} } = location.state || {};

  const [formData, setFormData] = useState({
    id: initialData.id || "",
    fullName: initialData.fullName || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",
    nationality: initialData.nationality || "",
    salary: initialData.salary || "",
    previousPosition: initialData.previousPosition || "",
    currentPosition: initialData.currentPosition || "",
    department: initialData.department || "",
  });
  const [error, setError] = useState(null);
  const [respMsg, setRespMsg] = useState(null);
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

    // Validations
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
      let res;
      if (mode === "add") {
        res = await axios.post(
          variables.apiUrl + "v1/employees",
          { ...formData },
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
      } else {
        res = await axios.patch(
          variables.apiUrl + `v1/employees/${formData.id}`,
          { ...formData },
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
      }

      if (res.status === 200 || res.status === 201) {
        setRespMsg(mode === "add" ? "Employee added successfully!" : "Employee updated successfully!");
      } else {
        setError("Operation failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Server error");
    }
  };

  return (
    <div className="masterContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required /><br/>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required /><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" /><br />
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" /><br />
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" /><br />
          <input type="text" name="previousPosition" value={formData.previousPosition} onChange={handleChange} placeholder="Previous Position" /><br />
          <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} placeholder="Current Position" /><br />
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Department" /><br />
          <button type="submit">{mode === "add" ? "Add Employee" : "Update Employee"}</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {respMsg && <p style={{ color: "green" }}>{respMsg}</p>}
      </div>
    </div>
  );
};

export default EmployeeForm;
