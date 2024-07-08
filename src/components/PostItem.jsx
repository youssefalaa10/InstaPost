function PostItem({ postImage, title, description, posterImage, posterName }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-full mb-4 relative">
      <div className="md:flex w-full">
        <div >
          <img
            className="h-auto w-48 object-cover md:h-full"
            src={postImage}
            alt="Post"
          />
        </div>
        <div className="p-8 w-full md:w-2/3 flex flex-col">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500">{description}</p>
          <div className="mt-4 flex items-center ">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={posterImage}
              alt="Poster"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{posterName}</p>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 flex space-x-4">
            <button className="text-blue-500 hover:text-blue-600 transition duration-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 mb-5 hover:fill-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
            </button>
            <button className="text-red-500 hover:text-red-600 transition duration-300 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 mr-5 mb-5 hover:fill-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
