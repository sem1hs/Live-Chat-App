import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useGetMessages() {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8000/api/messages/${selectedConversation._id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (!data) throw new Error("Data not Found");
        setMessages(data.messages);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
}

export default useGetMessages;
