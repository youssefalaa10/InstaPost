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
// import TimeAgo from "react-timeago";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/comment.css";
const SocialPost = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);

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

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white mb-4">
      {loading ? (
        <Skeleton height={100} />
      ) : (
        <>
          <div className="flex items-center mb-4">
            <img
              src={currentUser.photoURL || post.data.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{post.data.userName}</span>
              <span className="text-gray-500 text-sm">
                {new Date(post.data?.timestamp?.toDate()).toLocaleString()}
              </span>
            </div>
            <FaEllipsisV className="text-gray-500 ml-auto justify-end" />
          </div>
          <span className="text-blue-400 text-sm inline-block">
            #{post.data.hasTag}
          </span>
          <p className="text-gray-700 mb-4">{post.data.description}</p>
          {post.data.img && (
            <img
              src={post.data.img}
              alt="post"
              className="w-full h-60 object-cover rounded-lg mb-4"
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
              onClick={() => setCommentBoxVisible(!commentBoxVisible)}
            >
              <FaRegComment />
              <span onClick={() => setCommentOpen(!commentOpen)}>
                {comments.length}
              </span>
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
      {commentOpen > 0 && (
        <div className="comment">
          {comments
            .sort((a, b) => b.data.timestamp - a.data.timestamp)
            .map((c) => (
              <div>
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
