import { Link } from "react-router-dom";

function SideBar() {
  const sideLinks = [
    {
      id: 1,
      icon: "pi pi-home",
      title: "News Feed",
      path: "/",
      active: true,
    },
    {
      id: 2,
      icon: "pi pi-user",
      title: "Profile",
      path: "/profile",
      active: false,
    },
  ];

  return (
    <aside className="sidebar p-4">
      <div className="flex flex-col items-center gap-2 rounded-lg shadow-md bg-gray-800 p-4">
      <img
        src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720742400&semt=ais_user"
        alt="avatar"
        className="w-20 h-20 rounded-full"
      />

<div className="mb-5 flex flex-col items-center">
        <span className="font-semibold text-white">Mohamed Omar</span>
        <span className="text-sm font-medium text-gray-200">mohamed.omar@gmail.com</span>
      </div>

        <ul className="w-full flex flex-col gap-2">
          {sideLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={
                  `sidebar-link text-sm text-white p-3 rounded-lg flex justify-start items-center gap-3 ` +
                  (link.active ? "active" : "")
                }
              >
                <i className={link.icon}></i>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
