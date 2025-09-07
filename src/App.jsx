import './App.css'
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Pages/Authentication/Login'
import Test from './Pages/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<ProtectedRoute><Test/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App
