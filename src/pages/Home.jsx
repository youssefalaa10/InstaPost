import AddPostBtn from "../components/AddPostBtn";
import Header from "../components/Header";
import SocialPost from "../components/SocialPost";
import SideBar from "../components/SideBar";

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
    </div>
  );
};

export default HomePage;
