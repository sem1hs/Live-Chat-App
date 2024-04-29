import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeletons from "../../skeletons/MessageSkeletons";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  }, [messages]);
  return (
    <div className="flex flex-col px-4 flex-1 overflow-auto">
      {loading &&
        Array.from({ length: 3 }).map((val, i) => {
          return <MessageSkeletons key={i}></MessageSkeletons>;
        })}
      {!loading && messages?.length === 0 && (
        <p className="text-center">Send a message to start the conversations</p>
      )}
      {!loading &&
        messages?.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message key={message._id} message={message}></Message>
          </div>
        ))}
    </div>
  );
}

export default Messages;
