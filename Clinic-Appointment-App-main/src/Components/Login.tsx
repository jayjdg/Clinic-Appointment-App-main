import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";

const Login = () => {
    const [UserRole, setUserRole] = useState("");
    const [UserId, setUserId] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        setError(""); // Reset error message

        // Validation: Check if fields are empty
        if (!UserRole) {
            setError("Please select a user role.");
            return;
        }
        if (!UserId.trim()) {
            setError("User ID cannot be empty.");
            return;
        }

        // Check login validity
        if (AuthService.login(UserRole, UserId)) {
            // Redirect based on role
            const role = AuthService.getRole();
            if (role === "Admin") navigate("/doctormaintenance", { replace: true });
            else if (role === "Doctor") navigate("/doctor", { replace: true });
            else if (role === "Patient") navigate("/appointment", { replace: true });
        } else {
            setError("Invalid Credentials. Check your User ID and Role.");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
    <h2 className="mt-3 text-2xl p-4 font-semibold text-center mb-4 shadow-sm text-blue-500 ">Appointment Scheduling System</h2>
    
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

    <select 
        value={UserRole} 
        onChange={(e) => setUserRole(e.target.value)} 
        className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    >
        <option className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="">-- Select User Type --</option>
        <option className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="Admin">Admin</option>
        <option className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="Doctor">Doctor</option>
        <option className="mt-2 block w-full p-2 border border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" value="Patient">Patient</option>
    </select>

    <input
        type="text"
        className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder="User ID"
        value={UserId}
        onChange={(e) => setUserId(e.target.value)}
    />

    <button 
        className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        onClick={handleLogin}
    >
        Login
    </button>
</div>

    );
}

export default Login;
