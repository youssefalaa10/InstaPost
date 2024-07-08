import AddPostBtn from '../components/AddPostBtn';
import PostItem from '../components/PostItem'; // Assuming PostItem is in components folder
import SearchBar from '../components/Search';

const Post = ({ posts }) => {
  return (
    <div >
      {<SearchBar />}
      {posts.map(post => (
        <PostItem key={post.id} {...post} />
      ))}
      <AddPostBtn />
    </div>
  );
};

export default Post;
