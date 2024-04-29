import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/users", {
          credentials: "include",
        });
        const data = await res.json();
        if (!data) throw new Error("Data not Found");
        setConversations(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
}

export default useGetConversations;
