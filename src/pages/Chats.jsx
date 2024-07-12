import ChatContainer from "../components/Chat/Chat-Container"
import DirectMessages from "../components/Chat/Direct-Messages"


function Chats() {
  return (
    <div className="flex h-screen">
      <DirectMessages />
      <ChatContainer />
    </div>
  )
}

export default Chats
