import React from "react";
import Logout from "../Components/Logout";
import { NavLink, Routes, Route } from 'react-router-dom';
import AddEmployee from "../Pages/EmployeesDirectory/AddEmployee";
import ViewEmployee from "../Pages/EmployeesDirectory/ViewEmployees";
import AddTeam from "../Pages/TeamDirectory/AddTeam";
import Dock from '../Components/Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";

const Test = () => {


  // const authUserString = sessionStorage.getItem("authUser");
  // const authUser = JSON.parse(authUserString);
  const items = [
  { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
];

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


  <Dock 
    items={items}
    panelHeight={68}
    baseItemSize={50}
    magnification={70}
  />
  </>
)};
export default Test;
