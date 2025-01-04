import React from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "react-use-cookie";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        removeCookie("my_token");
        navigate("/");
    }
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Log out
    </button>
  );
};

export default Logout;
