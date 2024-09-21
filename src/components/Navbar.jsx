import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import { FaRegRegistered, FaArchway, FaRegListAlt, FaHome} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { TbLogout2, TbLogin2 } from "react-icons/tb";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/"><img src="/images/imizone.png" alt="imizone" /></NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"><FaHome /> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"><FaArchway /> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"><FaRegListAlt /> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"><FaMessage /> Contact </NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout"><TbLogout2 /> Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"><FaRegRegistered /> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"><TbLogin2 /> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};