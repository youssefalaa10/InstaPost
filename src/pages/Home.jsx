import AddPostBtn from "../components/AddPostBtn";
// import Header from "../components/Home/Header";
// import SocialPost from "../components/SocialPost";
import SideBar from "../components/Home/SideBar";
import TrendingTopics from "../components/Home/Trend-Side";

import "../styles/home-layout.css";
import AddPost from "../components/AddPost";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import SocialPost from "../components/SocialPost";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className="home-layout">
      {/* <Header className="header" /> */}

      <SideBar className="sidebar" />

      <main className="main">
        <AddPost />
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <SocialPost key={p.id} post={p} />
          ))}
        {/* {posts.map((post) => (
          <SocialPost key={post.id} {...post} />
        ))} */}
        <AddPostBtn />
      </main>
      <TrendingTopics className="trending-topics" />
    </div>
  );
};

export default HomePage;
