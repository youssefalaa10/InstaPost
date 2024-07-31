import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the import path accordingly

const DirectMessages = ({ setRecipient }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="w-full md:w-1/3 border-r border-gray-300 h-screen overflow-y-auto bg-gray-50">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="overflow-y-auto">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
            onClick={() => setRecipient(user)}
          >
            <img
              src={user.photoURL}
              alt={`${user.displayName} avatar`}
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-lg text-gray-800">{user.displayName||user.username}</h4>
                <span className="text-xs text-gray-500">{user.timestamp}</span>
              </div>
              <p className="text-gray-600 mt-1 truncate">{user.message}</p>
            </div>
            {user.online && (
              <span className="w-3 h-3 bg-green-500 rounded-full ml-2 absolute bottom-4 right-4"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectMessages;
