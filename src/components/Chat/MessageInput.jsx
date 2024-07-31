import { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-300 flex items-center">
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="ml-3 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
