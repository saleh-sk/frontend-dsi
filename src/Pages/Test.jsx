import React from "react";
import Logout from "../Components/Logout";
import { NavLink, Routes, Route } from 'react-router-dom';
import AddEmployee from "../Pages/EmployeesDirectory/AddEmployee";
import ViewEmployee from "../Pages/EmployeesDirectory/ViewEmployees";
import AddTeam from "../Pages/TeamDirectory/AddTeam";
const Test = () => {


  // const authUserString = sessionStorage.getItem("authUser");
  // const authUser = JSON.parse(authUserString);
  return (
  <>
    {/* {authUser.token} */}
<ul>
              {[
                { name: 'Add Employee', to: '/AddEmployee' },
                { name: 'View Employee', to: '/ViewEmployees' },
                { name: 'Add Team', to: '/AddTeam' },
              ].map(({ name, to }) => (
                <li key={name}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>

  <div className="content">
        <Routes>
          <Route path="/AddEmployee" element={<AddEmployee />} />
          <Route path="/ViewEmployee" element={<ViewEmployee />} />
        </Routes>
  <Logout/>
  </div>
  </>
)};
export default Test;
