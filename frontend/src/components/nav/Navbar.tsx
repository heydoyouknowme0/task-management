import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth";
import classes from "./Navbar.module.scss";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState<User>(null);
  const { isAdmin, verifyAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/me`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/auth/logout`);
      setUser(null);
      await verifyAuth();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;
  const isOnAdminPage = location.pathname.startsWith("/admin");
  const handlePageChange = () => {
    if (isAdmin) {
      if (isOnAdminPage) {
        return navigate("/");
      } else {
        return navigate("/admin");
      }
    }
  };

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.email}>{user.email}</p>
        </div>
      </div>
      <nav>
        {isAdmin && (
          <button
            type="button"
            className={classes.changeBtn}
            onClick={handlePageChange}
          >
            {isOnAdminPage ? "your Tasks" : "manage Tasks"}
          </button>
        )}
        <Link to="/edit-profile" className={classes.editBtn}>
          Edit
        </Link>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </nav>
    </header>
  );
}
