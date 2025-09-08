import React, { useState } from "react";
import variables from "../../../variables";
import UserHelper from "../../Utils/UserHelper";
import {
  generalStringValidator,
  sanitizeInput,
} from "../../Utils/FieldsValidator";
import axios from "axios";

const AddTeam = () => {
  const [error, setError] = useState(null);
  const [respMsg, setRespMsg] = useState(null);
  const [formData, setFormData] = useState({
    leader: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = UserHelper.getToken();
    if (!token) {
      setError("No authorization token found. Please login again.");
      return;
    }
    setError("");
    setRespMsg("");
    const sanitizedData = {
      leader: sanitizeInput(formData.teamLeader),
      name: sanitizeInput(formData.teamName),
    };
    console.log(sanitizedData);

    if (!generalStringValidator(sanitizedData.leader)) {
      setError("Please enter a valid team leader name.");
      return;
    } else if (!generalStringValidator(sanitizedData.name)) {
      setError("Please enter a valid team name.");
      return;
    }
    const endpoint = variables.apiUrl + "v1/teams";

    try {
      const resp = await axios.post(
        endpoint,
        { ...sanitizedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200 || resp.status === 201) {
        setRespMsg("Team Created Successfuly ");
        setFormData({ teamLeader: "", teamName: "" });
      } else {
        setError("Operation failed.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="masterContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            value={formData.teamName ||""}
            onChange={handleChange}
            placeholder="Team Name"
            required
          />
          <br />
          <input
            type="text"
            name="teamLeader"
            value={formData.teamLeader ||""}
            onChange={handleChange}
            placeholder="Team Leader"
            required
          />
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Add Team"}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {respMsg && <p style={{ color: "green" }}>{respMsg}</p>}
      </div>
    </div>
  );
};

export default AddTeam;
