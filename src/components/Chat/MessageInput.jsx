

const MessageInput = () => {
  return (
    <div className="p-4 bg-white border-t border-gray-300">
      <input
        type="text"
        placeholder="I could use..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
};

export default MessageInput;
