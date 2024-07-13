// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { supabase } from "../api/client";


function Navbar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkUser = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     if (session) {
  //       setIsLoggedIn(true);
  //     }
  //   };

  //   checkUser();
  // }, []);

  // const handleSignOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error("Error signing out:", error.message);
  //     return;
  //   }
  //   setIsLoggedIn(false);
  // };

  return (
    <div className="navbar bg-white flex justify-between items-center h-16 px-4 shadow-sm">
      {/* Logo container */}
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">Twitter</span>
        <img
          src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-download-2.png"
          alt="Twitter logo"
          className="h-8 w-8"
        />
      </div>

      {/* Search bar container */}
      <div className="flex rounded-full bg-gray-100 px-3 py-2  w-full max-w-md">
        <span className="text-gray-400 text-sm mr-2">Search Twitter</span>
        <input type="text" className="w-full bg-transparent focus:outline-none" />
      </div>

      {/* Navigation links container */}
      <div>
        <a href="#" className="text-gray-600 font-medium px-3 hover:underline">
          Explore
        </a>
        <a href="#" className="text-gray-600 font-medium px-3 hover:underline">
          Notifications
        </a>
        <a href="#" className="text-gray-600 font-medium px-3 hover:underline">
          Messages
        </a>
        <img
          src="https://www.freevectorlogos.com/pics/download/twitter-bird-logo/twitter-bird-logo.svg"
          alt="Profile avatar"
          className="h-8 w-8 rounded-full ml-4"
        />
      </div>
    </div>
  );
}

export default Navbar;
