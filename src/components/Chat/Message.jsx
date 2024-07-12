

const Message = ({ isSender, message, timestamp }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs p-4 rounded-lg shadow-md ${isSender ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
        <p>{message}</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
};

export default Message;
