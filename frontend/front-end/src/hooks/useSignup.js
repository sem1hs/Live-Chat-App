import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
function useSignUp() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors(
      fullName,
      userName,
      password,
      confirmPassword,
      gender
    );

    setLoading(true);
    if (!success) return;

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
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

  return { loading, signup };
}
function handleInputErrors(
  fullName,
  userName,
  password,
  confirmPassword,
  gender
) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length > 6) {
    toast.error("Passwords must be at least 6 characters");
    return false;
  }
  return true;
}
export default useSignUp;
