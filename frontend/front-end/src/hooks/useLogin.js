import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (userName, password) => {
    const success = handleInputErrors(userName, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName, password }),
      });
      const data = await res.json();

      if (!data) throw new Error("Data not Found");

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}
function handleInputErrors(userName, password) {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
export default useLogin;
