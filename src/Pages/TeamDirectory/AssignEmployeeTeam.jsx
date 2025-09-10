import React, { useEffect, useState } from "react";
import {
  GetEmployees,
  GetTeams,
  AssignEmployeeToTeam,
} from "../../Utils/Getters";
import axios from "axios";
import variables from "../../../variables";
import UserHelper from "../../Utils/UserHelper";

function AssignEmployeeTeam() {
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [teamInfo, setTeamInfo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empData, teamData] = await Promise.all([
          GetEmployees(),
          GetTeams(),
        ]);

        if (!empData) {
          setError("Failed to fetch employees");
        } else {
          setEmployees(empData);
        }

        if (!teamData) {
          setError("Failed to fetch teams");
        } else {
          setTeams(teamData.data);
          console.log(teamData);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      setMessage("");
      setError("");

      await AssignEmployeeToTeam(selectedEmployee, selectedTeam);

      const emp = employees.find((e) => e.id === parseInt(selectedEmployee));
      const team = teams.find((t) => t.id === parseInt(selectedTeam));

      setMessage(`✅ Assigned ${emp?.fullName} to ${team?.name}`);

      const id = selectedTeam;
      const endpoint = `${variables.apiUrl}v1/teams/${id}/employees`;
      const token = UserHelper.getToken();

      try {
        const resp = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resp.status === 200) {
          setTeamInfo(resp.data); // ✅ store only the data
        } else {
          setError("Unexpected response status");
        }
      } catch (error) {
        console.log(error);
        setError(`Failed to fetch team info: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to assign employee to team");
    }
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div>
        <h2>Employees</h2>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select an Employee</option>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))
          ) : (
            <option disabled>No employees found</option>
          )}
        </select>
      </div>

      <div>
        <h2>Teams</h2>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select a Team</option>
          {teams.length > 0 ? (
            teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))
          ) : (
            <option disabled>No teams found</option>
          )}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          hidden={!selectedEmployee || !selectedTeam}
          onClick={handleAssign}
        >
          Assign
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {teamInfo?.data?.length > 0 && (
          <div>
            <h3>Team Members</h3>
            <table border="1">
              <thead>
                <tr>
                  {["ID", "Full Name", "Email", "Department"].map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamInfo.data.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.fullName}</td>
                    <td>{member.email}</td>
                    <td>{member.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignEmployeeTeam;
