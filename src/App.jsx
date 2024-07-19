import { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import { supabase } from "./api/client"; 
import Layout from "./layouts/Layout";
import { useUser } from "@supabase/auth-helpers-react";
import LoginPage from "./pages/login";

function App() {

  const user = useUser();
  console.log(`dada${user}`);

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
      {!user === null ? (
        <LoginPage />
      ) : (
        <Layout>
          <HomePage posts={posts} />
        </Layout>
      )}
    </>
  );
}

export default App;
