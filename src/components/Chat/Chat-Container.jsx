import Message from "./Message";
import MessageInput from "./MessageInput";


const ChatContainer = () => {
  return (
    <div className="flex flex-col h-screen w-2/3">
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {/* Messages */}
        <Message
          isSender={false}
          message="Hi, how's your day shaping up?"
          timestamp="8:30 AM"
        />
        <Message
          isSender={true}
          message="It's been quite hectic, deadlines looming. Just finished a long meeting."
          timestamp="8:35 AM"
        />
        <Message
          isSender={false}
          message="Oh, I can imagine. I had a ton of emails to sift through. Exhausted."
          timestamp="9:00 AM"
        />
        <Message
          isSender={true}
          message="Tell me about it. We definitely need a break. Dinner tonight?"
          timestamp="8:30 AM"
        />
        <Message
          isSender={true}
          message="Meet there at 7?"
          timestamp="8:30 AM"
        />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
