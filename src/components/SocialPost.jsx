import { FaEllipsisV, FaRegComment } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import EditPost from "./EditPost";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/comment.css";
import PostSkeleton from "./PostSkeleton";
import "../styles/theme.css";
import { TbEditCircle } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
const SocialPost = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
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

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "comments"),
      (snapshot) => {
        setComments(
          snapshot.docs.map((snapshot) => ({
            id: snapshot.id,
            data: snapshot.data(),
          }))
        );
        setLoading(false);
      }
    );
    return () => {
      unSub();
    };
  }, [post.id]);

  const handleComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: input,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
      timestamp: serverTimestamp(),
    });
    setCommentBoxVisible(false);
    setInput("");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const startEditing = () => {
    setShowDropdown(false);
    setIsEditing(true);
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (e) {
      console.log(e);
      console.log(posts);
    }
  };

  return (
    <div className="social-post p-4 rounded-lg shadow-lg bg-white mb-4">
    {loading ? (
        <PostSkeleton />
      ) : isEditing ? (
        <EditPost post={post} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <div className="flex items-center mb-4">
            <img
              src={post.data.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{post.data.userName}</span>
              <span className="text-gray-500 text-sm">
                {new Date(post.data?.timestamp?.toDate()).toLocaleString()}
              </span>
            </div>
            {currentUser?.uid === post.data.uid && (
              <button className="ml-auto" onClick={toggleDropdown}>
                <FaEllipsisV className="text-gray-500 ml-auto justify-end" />
              </button>
            )}
            {currentUser?.uid === post.data.uid && showDropdown && (
              <div className="absolute right-80 mt-32 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
                <button
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left text-blue-600"
                  onClick={startEditing}
                >
                  <div className="flex items-center space-x-2 gap-2">
                    <TbEditCircle className="text-2xl" />
                    Edit
                  </div>
                </button>
                {currentUser?.uid === post.data.uid && (
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left"
                  >
                    <div className="flex items-center space-x-2 gap-2">
                      <MdDelete className="text-2xl" />
                      Delete
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>
          <span className="text-blue-400 text-sm inline-block">
            #{post.data.hasTag}
          </span>
          <p className="text-gray-700 mb-4">{post.data.description}</p>
          {post.data.img && (
            <div
              className="w-full h-60 bg-cover bg-center rounded-lg mb-4"
              style={{ backgroundImage: `url(${post.data.img})` }}
              alt="post"
            />
          )}
          <div className="flex items-center justify-between">
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
            <button
              className="flex items-center text-gray-500 gap-2"
              onClick={() => setCommentBoxVisible((prev) => !prev)}
            >
              <FaRegComment />
              {comments.length}
            </button>
          </div>
        </>
      )}
      {commentBoxVisible && (
        <form onSubmit={handleComment} className="commentBox gap-2 mt-3">
          <textarea
            type="text"
            placeholder="Write a comment ..."
            className="commentInput"
            rows={1}
            style={{ resize: "none" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input} className="commentPost">
            Comment
          </button>
        </form>
      )}
      {commentBoxVisible && (
        <div className="comment">
          {comments
            .sort((a, b) => b.data.timestamp - a.data.timestamp)
            .map((c) => (
              <div key={c.id}>
                <div className="commentWrapper">
                  <img
                    className="commentProfileImg"
                    src={c.data.photoURL}
                    alt=""
                  />
                  <div className="commentInfo">
                    <span className="commentUsername">
                      @{c.data.displayName.replace(/\s+/g, "").toLowerCase()}
                    </span>
                    <p className="commentText">{c.data.comment}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SocialPost;
