import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { auth, db } from "../../firebase";

const ChatContainer = ({ recipient }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (recipient) {
      const q = query(
        collection(db, "chats", recipient.id, "messages"),
        orderBy("timestamp", "asc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });
      return () => unsubscribe();
    }
  }, [recipient]);

  const handleSendMessage = async (message) => {
    await addDoc(collection(db, "chats", recipient.id, "messages"), {
      message,
      senderId: auth.currentUser.uid,
      timestamp: new Date()
    });
  };

  return (
    <div className="flex flex-col h-screen w-full md:w-2/3">
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <Message
              key={index}
              isSender={msg.senderId === auth.currentUser.uid}
              message={msg.message}
              timestamp={msg.timestamp.toDate().toLocaleTimeString()}
            />
          ))}
        </div>
      </div>
      <div className="bg-white border-t border-gray-300 p-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
