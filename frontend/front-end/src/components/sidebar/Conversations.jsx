import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  if (conversations.status === "fail") {
    return <label className="label-text">Conversations not found</label>;
  }
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conv, i) => {
        return (
          <Conversation
            key={conv._id}
            conversation={conv}
            emoji={getRandomEmoji()}
            lasI={i === conv.length - 1}
          ></Conversation>
        );
      })}
      {loading ? (
        <span className="looading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
}

export default Conversations;
