import { Link } from "react-router-dom";

function SideBar() {
  // const sideLinks = [
  //   {
  //     id: 1,
  //     icon: "pi pi-home",
  //     title: "News Feed",
  //     path: "/",
  //     active: true,
  //   },
  // ];

  return (
    <aside className="sidebar p-4 ">
      <div className="flex flex-col items-center gap-2 rounded-lg shadow-md bg-white p-4">
        <img
          src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />

        <div className="mb-5 flex flex-col items-center">
          <span className="font-semibold text-gray-800">Mohamed Omar</span>
          <span className="text-sm font-medium text-gray-700">mohamed.omar@gmail.com</span>
        </div>

        <hr className="w-full border-gray-300 mb-5" />

        <Link
          to="/profile"
          className="sidebar-link text-sm text-gray-700 p-3 rounded-lg flex justify-center items-center gap-3 text-blue-700 hover:text-cyan-700"
        >
         
         My Profile
        </Link>

       
      </div>
    </aside>
  );
}

export default SideBar;
