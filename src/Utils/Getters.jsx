import axios from "axios";
import variables from "../../variables"; 
import UserHelper from "./UserHelper"

export async function GetEmployees() {
  const token = UserHelper.getToken();
  const endpoint = variables.apiUrl;

  try {
        const res = await axios.get(endpoint+"v1/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          console.log("fetching employees failed ba3den b2llak lesh");
        }
        return res.data?.data || res.data || [];
      } catch (err) {
    console.error("Error fetching employees:", err);
    return null;
  }
}

export async function GetTeams() {
  const token = UserHelper.getToken();
  const endpoint = variables.apiUrl;
  try {
    const res = await axios.get(endpoint+"v1/teams",{
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.status === 200 ? res.data : {};
  } catch {
    return {};
  }
}

export async function AssignEmployeeToTeam(team_id,employee_id) {
  const token = UserHelper.getToken();
  const endpoint =variables.apiUrl;
  try {
    const res = await axios.post(endpoint+"v1/teams/assign-employee/", {team_id,employee_id},
      {
        headers:{Authorization : `Bearer ${token}`},
      });
      res.status===200?console.log('meshi 7al m3allem'):console.log('failed');
      
  } catch (error) {
    console.log(error);
  }
}


