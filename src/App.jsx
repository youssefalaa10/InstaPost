import { useEffect, useState } from "react";
import HomePage from "./pages/Home";

import Layout from "./layouts/Layout";

import LoginPage from "./pages/login";

function App() {




  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    
    // setPosts(data);
    // console.log(data);
  }

  return (
    <>
     <Layout>
          <HomePage posts={posts} />
        </Layout>
    </>
  );
}

export default App;
