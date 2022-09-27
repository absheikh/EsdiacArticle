import React from "react";
import {
  FaHome,
  FaHSquare,
  FaPen,
  FaPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCheck,
  FaUserCircle,
  FaUserEdit,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="btn">
          Esdiac Article
        </Link>
      </div>
      <ul>
        <li>
          <Link className="btn" to="/">
            <FaHome /> Home
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link className="btn" to="/dashboard">
                <FaUserCircle /> Dashboard
              </Link>
            </li>
            <li>
              <Link className="btn" to="/dashboard/articles/add">
                <FaPlus /> Add Article
              </Link>
            </li>
            <li>
              <Link className="btn" to="/dashboard/profile/update/">
                <FaUserEdit />
                Update Profile
              </Link>
            </li>
            <li>
              <button className="btn bg-danger text-white" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
