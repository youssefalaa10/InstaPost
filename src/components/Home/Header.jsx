function Header() {
  return (
    <header className="header px-4 bg-green-200 flex justify-end items-center gap-2">
      <div className="relative w-fit">
        <input
          type="text"
          placeholder="Search..."
          // value={searched}
          // onChange={handleChange}
          className="py-2 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-primary"
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
