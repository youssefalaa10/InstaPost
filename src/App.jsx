import { useState } from "react";

import HomePage from "./pages/Home";

function App() {
  const postData = [
    {
      id: 1,
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      title: "Post Second",
      description:
        "This is a description of the post. It provides some details about the content of the post.This is a description of the post. It provides some details about the content of the post",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      posterName: "John",
      postTime: "4 min ago",
    },
    {
      id: 2,
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      title: "Post Second",
      description:
        "This is a description of the post. It provides some details about the content of the post.This is a description of the post. It provides some details about the content of the post",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      posterName: "John",
      postTime: "4 min ago",
    },
    {
      id: 3,
      postImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      title: "Post Second",
      description:
        "This is a description of the post. It provides some details about the content of the post.This is a description of the post. It provides some details about the content of the post",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5fBF0fnqBLJwPwgaeGgctc5gkHZ8XIPzAbQ&s",
      posterName: "John",
      postTime: "4 min ago",
    },
  ];
  const [posts, setPosts] = useState(postData);

  return (
    <>
      <HomePage posts={posts} />
    </>
  );
}

export default App;
