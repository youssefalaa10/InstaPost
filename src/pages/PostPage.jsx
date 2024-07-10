import AddPostBtn from '../components/AddPostBtn';
import SearchBar from '../components/Search';
import SocialPost from '../components/SocialPost';

const Post = ({ posts }) => {
  return (
    <div >
      {<SearchBar />}
      {posts.map(post => (
        <SocialPost key={post.id} {...post} />
      ))}
      <AddPostBtn />
    </div>
  );
};

export default Post;
