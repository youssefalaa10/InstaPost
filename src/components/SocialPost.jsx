// import React from "react";

const SocialPost = ({
  postImage,
  title,
  description,
  posterImage,
  posterName,
  postTime,
}) => {
  return (
    <div className="container mx-auto p-4 border rounded-lg shadow-lg">
      <div className="flex">
        {/* Image Div */}
        <div className="w-2/5">
          <img
            src={postImage}
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s"
            // alt={post.title}
            alt="post image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Poster Details Div */}
        <div className="w-3/5 pl-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center mt-4">
              <img
                src={posterImage}
                //  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s"
                alt="avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-semibold">
                {posterName}
                {/* James */}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {/* {postTime} */}4 mins ago
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2">
            {title}
            {/* Post Title this is a test post */}
          </h2>
          <p className="text-gray-700 mb-4">
            {description}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 p-2 text-white bg-[#8D66FC] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              33
            </button>
            <button className="flex items-center gap-2 text-gray-500  rounded-lg border border-gray-300 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
              <span>5</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500  rounded-lg border border-gray-300 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPost;
