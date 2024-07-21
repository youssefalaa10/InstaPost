

const Message = ({ isSender, message, timestamp }) => {
  return (
<div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
  <div className={`max-w-xs p-4 rounded-lg shadow-md ${isSender ? 'bg-green-500 text-white' : 'bg-gray-200'} flex flex-col`}>
    <p className="text-sm">{message}</p>
    <span className="text-xs text-gray-500 mt-1 self-end">{timestamp}</span>
  </div>
</div>
  )
};

export default Message;
