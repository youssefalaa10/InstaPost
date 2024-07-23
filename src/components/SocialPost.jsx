import { FaEllipsisV, FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go"; // Import GoHeartFill
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  // serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const SocialPost = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
    return () => {
      unSub();
    };
  }, [post.id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser?.uid]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white mb-4">
      <div className="flex items-center mb-4">
        <img
          src={currentUser.photoURL || post.data.photoURL}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{post.data.userName}</span>
          <span className="text-gray-500 text-sm"> {new Date(post.data?.timestamp.toDate()).toLocaleString()}</span>
         
        </div>
        <FaEllipsisV className="text-gray-500 ml-auto justify-end" />
       
      </div>
      <span className="text-blue-400 text-sm inline-block">
        #{post.data.hasTag}
        {/* # football */}
      </span>
      {/* <h2 className="text-xl font-bold mb-2">{title}</h2> */}
      <p className="text-gray-700 mb-4">{post.data.description}</p>
      <img
        src={post.data.img}
        alt="post"
        className="w-full h-60 object-cover rounded-lg mb-4"
      />

      <div className="flex items-center justify-between ">
        <button
          className="flex items-center text-gray-500 gap-2"
          onClick={likePost}
        >
          {liked ? (
            <GoHeartFill className="text-red-500" />
          ) : (
            <GoHeart className="hover:text-red-500" />
          )}
          {likes.length} 
        </button>
        <button className="flex items-center text-gray-500 gap-2">
          <FaRegComment />
          Comment
        </button>
      </div>
    </div>
  );
};

export default SocialPost;
