import { useState } from "react";
import "./App.css";
import Post from "./pages/PostPage";
import Navbar from "./components/Navbar";

function App() {
  const postData = [
    {
      id: 1,
      postImage: "https://via.placeholder.com/150",
      title: "Post Title",
      description:
        "This is a description of the post. It provides some details about the content of the post.",
      posterImage: "https://via.placeholder.com/50",
      posterName: "John Doe",
    },
    {
      id: 2,
      postImage: "https://via.placeholder.com/150",
      title: "Post Second",
      description:
        "This is a description of the post. It provides some details about the content of the post.This is a description of the post. It provides some details about the content of the post",
      posterImage: "https://via.placeholder.com/50",
      posterName: "John",
    },
    {
      id: 3,
      postImage: "https://via.placeholder.com/150",
      title: "Post Title",
      description:
        "This is a description of the post. It provides some details about the content of the post.",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjclDv0e9IVQdcKL5CgI8DITEgglEavaKqww&s",
      posterName: "John Doe",
    },
  ];
  const [posts, setPosts] = useState(postData);

  return (
    <>
      <Navbar />
      <Post posts={posts} />
    </>
  );
}

export default App;
