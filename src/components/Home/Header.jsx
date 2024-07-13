import "primeicons/primeicons.css"; // تأكد من استيراد CSS الخاص بـ PrimeIcons
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header bg-white shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo container */}
        <div className="flex-shrink-0">
          <i className="pi pi-instagram text-2xl text-blue-500"></i>
        </div>

        {/* Navigation links container */}
        <div className="flex items-center space-x-4">
          <NavLink to="/chat" className="text-gray-600 hover:text-blue-500">
            <i className="pi pi-envelope text-xl"></i>
          </NavLink>
         
          <a href="#" className="text-gray-600 hover:text-blue-500">
            <i className="pi pi-bell text-xl"></i>
          </a>
          <NavLink to="/profile">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
            alt="Profile avatar"
            className="h-8 w-8 rounded-full border border-gray-300 ml-4"
          />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
