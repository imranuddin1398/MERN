import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import "./Adminlayout.css";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    console.log("admin Layout", user)

    if(isLoading) {
        return <h1>Loading.....</h1>
    } 
    if(!user.isAdmin) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <header>
                <div className="side-nav">
                    <h2>Admin Panel</h2>
                    <nav>
                        <ul>
                            <li> <NavLink to="/admin/users"><FaUser />Users</NavLink> </li>
                            <li> <NavLink to="/admin/contacts"><FaMessage />Contacts</NavLink> </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};