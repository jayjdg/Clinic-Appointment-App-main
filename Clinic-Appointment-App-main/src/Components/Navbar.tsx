import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import logo from "../assets/DrIcon.png"

const Navbar = () => {
    const isAuthenticated = AuthService.isAuthenticated();
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="w-10 h-10 ">
      <img src={logo} alt='Medical Appointment System' />
      
    </div>
        {/* Navigation Links */}
        <ul className="flex space-x-6 justify-center w-full">
          {/* <li>
            <Link className="text-gray-700 hover:text-blue-500 font-semibold transition duration-300" to="/Login">
              Clinic Dashboard
            </Link>
          </li> */}
          {/* <li>
            <Link className="text-gray-700 hover:text-blue-500 font-semibold transition duration-300" to="/">
              Home
            </Link>
          </li> */}
          <li>
            <Link className="text-gray-700 hover:text-blue-500 font-semibold transition duration-300" to="/Login">
              Login
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-500 font-semibold transition duration-300" to="/doctor">
              Doctor
            </Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-500 font-semibold transition duration-300" to="/appointment">
              Appointments
            </Link>
          </li>
        </ul>
      
        {/* Logout Button (Shown only when authenticated) */}
        {isAuthenticated && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={() => {
              AuthService.logout();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        )}
      </nav>
      
/*         <nav className='navbar navbar-light bg-light px-3'>
            <a className='navbar-brand' href='/'>Clinic dashboard</a>
            <a className='navbar-brand' href='/contact'>Contact</a>
            <a className='navbar-brand' href='/about'>About</a>
            
        </nav> */
    )

}

export default Navbar;