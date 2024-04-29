import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <BiLogOut
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        ></BiLogOut>
      )}
    </div>
  );
}

export default LogoutButton;
