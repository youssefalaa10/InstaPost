import SideBar from "../components/Home/SideBar";
import TrendingTopics from "../components/Home/Trend-Side";

import "../styles/home-layout.css";
import AddPost from "../components/AddPost";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import SocialPost from "../components/SocialPost";
import { AuthContext } from "../context/AuthContext";
import Friends from "../components/Home/Friends";
import "../styles/theme.css"
const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
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
      <div className="sidebar">
        {currentUser && <SideBar />}
        <Friends />
      </div>

      <main className="main">
        <AddPost />
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <SocialPost key={p.id} post={p} />
          ))}
      </main>
      <TrendingTopics className="trending-topics" />
    </div>
  );
};

export default HomePage;
