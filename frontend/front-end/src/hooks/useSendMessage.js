import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

function useSendMessages() {
  const [loading, setLoading] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();

      if (!data) throw new Error("Data not Found");
      setMessages([...messages, data.message]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessages;
