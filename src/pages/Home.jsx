import AddPostBtn from "../components/AddPostBtn";
import Header from "../components/Home/Header";
import SocialPost from "../components/SocialPost";
import SideBar from "../components/Home/SideBar";
import TrendingTopics from "../components/Home/Trend-Side";

import "../styles/home-layout.css";

const HomePage = ({ posts }) => {
  return (
    <div className="home-layout">
      <Header className="header" />

      <SideBar className="sidebar" />

      <main className="main">
        {posts.map((post) => (
          <SocialPost key={post.id} {...post} />
        ))}
        <AddPostBtn />
      </main>
      <TrendingTopics className="trending-topics" />
    </div>
  );
};

export default HomePage;
