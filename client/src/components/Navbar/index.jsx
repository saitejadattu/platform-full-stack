import React from "react";
import cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    cookie.remove("jwtToken");
    navigate("/login");
  };
  return (
    <div className="bg-white pl-5 pr-5 p-4">
      <nav>
        <ul className="list-none flex justify-between ">
          <li className="font-bold text-blue-400">
            <Link to="/">React</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-400 text-white rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
