import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
import { HiOutlineMail } from "react-icons/hi";
import { FiBell } from "react-icons/fi";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signing out...");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const { currentUser } = useContext(AuthContext);

  return (
    <header className="header bg-white shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo container */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="w-16 rounded-full" />
          </NavLink>
        </div>

        {/* Navigation links container */}
        <div className="flex items-center space-x-4">
          {currentUser && (
            <>
              <NavLink to="/chat" className="text-gray-600 hover:text-blue-500">
                <HiOutlineMail className="text-2xl" />
              </NavLink>
              <NavLink
                to="/notifications"
                className="text-gray-600 hover:text-blue-500"
              >
                <FiBell className="text-2xl" />
              </NavLink>
            </>
          )}
          {currentUser ? (
            <div className="relative mt-1">
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                aria-label="Profile options"
              >
                <img
                  src={
                    currentUser?.photoURL ||
                    "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
                  }
                  alt="Profile avatar"
                  className="h-8 w-8 rounded-full border border-gray-300"
                />
              </button>
              {/* Dropdown menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                  <NavLink
                    to={`/profile/${currentUser?.displayName}`}
                    className="block px-4 py-2 hover:bg-gray-200 text-blue-600"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <NavLink
                to="/login"
                className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
              >
                <FaSignInAlt className="mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-blue-500 border-blue-500 hover:bg-blue-50"
              >
                <FaUserPlus className="mr-2" />
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
