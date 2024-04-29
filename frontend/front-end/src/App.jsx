import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import "./index.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home></Home> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp></SignUp>}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login></Login>}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
