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
  const [employees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const [empData, teamData] = await Promise.all([
          GetEmployees(),
          GetTeams(),
        ]);

        if (!empData) {
          setError("Failed to fetch employees");
        } 

        if (!teamData) {
          setError("Failed to fetch teams");
        } else {
          setTeams(teamData.data);
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
      setAssigning(true);


      await AssignEmployeeToTeam(selectedEmployee, selectedTeam);

      const emp = employees.find((e) => e.id === parseInt(selectedEmployee));
      const team = teams.find((t) => t.id === parseInt(selectedTeam));

      setMessage(`Successfully assigned ${emp?.fullName} to ${team?.name}`);

      const id = selectedTeam;
      const endpoint = `${variables.apiUrl}v1/teams/${id}/employees`;
      const token = UserHelper.getToken();

      const resp = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.status === 200) {
        console.log("done");
        
      } else {
        setError("Unexpected response status");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to assign employee to team");
    } finally {
      setAssigning(false);
    }
  };


  if (loading) {
    return (
      <div>
        <div></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Assign Employee to Team</h1>
      
      {error && (
        <div>
          <span>⚠️</span>
          {error}
        </div>
      )}
      
      {message && (
        <div>
          <span>✅</span>
          {message}
        </div>
      )}

      <div>
        <div>
          <h2>Select Employee</h2>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select an Employee</option>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName} - {emp.department}
                </option>
              ))
            ) : (
              <option disabled>No employees found</option>
            )}
          </select>
        </div>

        <div className="selection-panel">
          <h2>Select Team</h2>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="selection-dropdown"
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
      </div>

      <div className="action-section">
        <button
          onClick={handleAssign}
          hidden={!selectedEmployee || !selectedTeam || assigning}
          className="assign-button"
        >
          {assigning ? "Assigning..." : "Assign to Team"}
        </button>
      </div>
    </div>
  );
}

export default AssignEmployeeTeam;