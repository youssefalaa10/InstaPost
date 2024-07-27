import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function TrendingTopics() {
  const [hasTags, setHasTags] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setHasTags(snapshot?.docs?.map((doc) => doc.data().hasTag));
      console.log(snapshot?.docs?.map((doc) => doc.data().hasTag));
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className="trending-topics bg-white rounded-lg shadow p-4 h-80 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Trends for you</h1>
      <div className="trending-list">
        <div className="trending-topic bg-gray-100 px-4 py-2 rounded mb-2 flex justify-between items-center hover:bg-gray-200 transition duration-300">
          <div className="flex flex-col items-center">
            {hasTags.map((hasTag) => (
              <span key={hasTag} className="text-gray-800 font-medium">
                #{hasTag}
              </span>
            ))}
            {/* <span className="text-gray-800 font-medium">#Minions</span> */}
            <span className="text-gray-600 text-sm ml-2 mr-3 pr-3">
              97.7 k{" "}
            </span>
          </div>
          <button className="text-blue-500 text-sm font-semibold hover:underline">
            Follow
          </button>
        </div>
        {/* Add more trending topics here */}
      </div>
    </div>
  );
}

export default TrendingTopics;
