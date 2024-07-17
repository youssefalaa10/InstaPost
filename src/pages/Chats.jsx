import ChatContainer from "../components/Chat/Chat-Container";
import DirectMessages from "../components/Chat/Direct-Messages";
import Layout from "../layouts/Layout";

function Chats() {
  return (
    <Layout>
      <div className="flex h-screen">
        <DirectMessages />
        <ChatContainer />
      </div>
    </Layout>
  );
}

export default Chats;
