import { useEffect, useState } from "react";

import HomePage from "./pages/Home";
import { supabase } from "./api/client";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data } = await supabase.from("posts").select("*");
    setPosts(data);
    console.log(data);
  }

  return (
    <>
      <HomePage posts={posts} />
    </>
  );
}

export default App;
