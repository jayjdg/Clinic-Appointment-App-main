import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthService from "./Services/AuthService";
import Navbar from "./Components/Navbar";
import Unauthorized from "./Components/Unauthorized";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./Components/Dashboard";
import DoctorDashboard from "./Components/Doctor";
import Appointment from "./Components/Appointment";
import Contact from './Components/Contact';
import About from './Components/About';
import "./index.css";
import DoctorMaintenance from "./Components/DoctorMaintenance";

const App = () => {
  const isAuthenticated = AuthService.isAuthenticated();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/doctormaintenance" element={<DoctorMaintenance />} />
        </Route>

        {/* Protected Routes for Doctor */}
        <Route element={<ProtectedRoute allowedRoles={["Doctor"]} />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Route>

        {/* Protected Routes for Patient */}
        <Route element={<ProtectedRoute allowedRoles={["Patient"]} />}>
          <Route path="/appointment" element={<Appointment />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/admin-dashboard" : "/login"} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
