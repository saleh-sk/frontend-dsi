/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import variables from "../../../variables";
import UserHelper from "../../Utils/UserHelper";
import { useNavigate } from "react-router-dom";

const ViewEmployees = () => {
  const endpoint = variables.apiUrl + "v1/employees";
  const token = UserHelper.getToken();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          setError("fetching employees failed ba3den b2llak lesh");
          alert(error);
        }
        setData(res.data?.data || res.data || []);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployees();
  }, [endpoint, token]);
  return (
    <div>
      <table border={1}>
        <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Nationality</th>
          <th>Salary</th>
          <th>Previous Position</th>
          <th>Current Position</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.fullName}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.nationality}</td>
                <td>{employee.salary}</td>
                <td>{employee.previousPosition}</td>
                <td>{employee.currentPosition}</td>
                <td>{employee.department}</td>
                <td>
                  <button
                    onClick={() =>
                  navigate("/AddEmployee", {
                    state: { mode: "edit", initialData: employee },
                  })
                }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployees;
