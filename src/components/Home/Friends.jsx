import { collection, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

function Friends() {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="friends p-4">
      <div className="p-4 bg-white rounded-lg shadow-md ">
        <span className="text-xl font-bold mb-4 block">Friends</span>

        {users
          .filter((user) => user.data.uid !== currentUser?.uid)
          .map((user) => (
            <div key={user.id} className="flex items-center gap-2 mb-4">
              <img
                src={user.data.photoURL}
                alt="userFriend"
                className="w-10 h-10 rounded-full mr-2 "
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 capitalize">
                  {user.data.userName}
                </span>
                <span className="text-sm text-gray-400">
                  {user.data.email}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Friends;
