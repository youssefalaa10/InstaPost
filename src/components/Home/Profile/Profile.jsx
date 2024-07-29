import Layout from "../../../layouts/Layout";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import SocialPost from "../../SocialPost";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [getUserInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setUserInfo(doc.data());
    });
    return () => unSub();
  }, [currentUser.uid]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "posts"),
      where("uid", "==", currentUser.uid)
    );

    const unSub = onSnapshot(postsQuery, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unSub();
  }, [currentUser.uid]);

  return (
    <Layout>
      <div className="w-full max-w-5xl mx-auto bg-gray-100 p-4">
        <div className="relative">
          <img
            src={
              getUserInfo.coverPhotoURL ||
              "https://givenow.com.au/img/default-cover.png"
            }
            alt="Background"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                src={currentUser.photoURL || "userName"}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
              />
              <Link to="/editprofile" className="absolute bottom-0 right-0 p-2">
                <MdEdit className="text-white bg-gray-600 rounded-full p-1 text-3xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <div className="text-center mt-16">
            <h1 className="text-2xl font-bold">
              {currentUser.displayName || getUserInfo.name}
            </h1>
            <p className="text-gray-400 mt-2">{getUserInfo.bio}</p>
          </div>
          <div className="mt-4 border-t pt-4 flex flex-col md:flex-row">
            <div className="flex-1">
              <h2 className="text-xl font-bold">About</h2>
              <p className="mt-4 text-gray-700">{getUserInfo.about}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Expertise</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getUserInfo.expertise?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 py-1 px-2 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Fluent in</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {getUserInfo.fluentIn?.map((language, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 py-1 px-2 rounded-lg text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-3">My Posts</h2>
            {userPosts.map((post) => (
              <SocialPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
