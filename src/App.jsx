import './App.css'
import Login from './Pages/Authentication/Login'
import Test from './Pages/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App
