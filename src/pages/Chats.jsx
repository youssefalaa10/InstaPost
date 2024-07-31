import { useState } from "react";

import Layout from "../layouts/Layout";
import DirectMessages from "../components/Chat/Direct-Messages";
import ChatContainer from "../components/Chat/Chat-Container";

function Chats() {
  const [recipient, setRecipient] = useState(null);

  return (
    <Layout>
      <div className="flex h-screen">
        <DirectMessages setRecipient={setRecipient} />
        {recipient && <ChatContainer recipient={recipient} />}
      </div>
    </Layout>
  );
}

export default Chats;
