import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function useLogout() {
  const [loading, setLoading] = useState();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (!data) throw new Error("Data not Found");

    localStorage.removeItem("chat-user");
    setAuthUser(null);
    try {
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
}

export default useLogout;
