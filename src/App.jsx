import './App.css';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Authentication/Login'
import Test from './Pages/Test';
import AddEmployee from './Pages/EmployeesDirectory/AddEmployee';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewEmployees from './Pages/EmployeesDirectory/ViewEmployees';
import AddTeam from './Pages/TeamDirectory/AddTeam';
import AssignEmployeeTeam from './Pages/TeamDirectory/AssignEmployeeTeam';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AddEmployee" element={<ProtectedRoute><AddEmployee/></ProtectedRoute>} />
        <Route path="/*" element={<ProtectedRoute><Test/></ProtectedRoute>} />
        <Route path="/ViewEmployees" element={<ProtectedRoute><ViewEmployees/></ProtectedRoute>} />
        <Route path='/AddTeam' element={<ProtectedRoute><AddTeam/></ProtectedRoute>}/>
        <Route path="/AssignEmployeeteam" element={<ProtectedRoute><AssignEmployeeTeam/></ProtectedRoute>}/> 
      </Routes>
    </Router>
  );
}

export default App
