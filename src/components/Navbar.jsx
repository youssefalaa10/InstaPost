import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await SupabaseAuthClient.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      return;
    }
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-md mb-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
            />
          </svg>
          <span className="ml-2 text-white text-lg font-semibold">
            InstaPost
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="space-x-4 flex">
          <NavLink
            to="/profile"
            className="text-white border border-white px-4 py-2 rounded transition duration-300 hover:bg-white hover:text-blue-500 focus:outline-none"
          >
            Profile
          </NavLink>
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="text-white border border-white px-4 py-2 rounded transition duration-300 hover:bg-white hover:text-blue-500 focus:outline-none"
            >
              Signout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-white border border-white px-4 py-2 rounded transition duration-300 hover:bg-white hover:text-blue-500 focus:outline-none"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;