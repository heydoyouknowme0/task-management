import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";
import Navbar from "../components/nav/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState<User>();
  const { verifyAuth, isAdmin } = useAuth();
  // const logout = async () => {
  //   await axios.get('/api/auth/logout');
  //   verifyAuth();
  // };
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/api/users/me/info`);
      setUserData(data);
      if (isAdmin) {
        console.log("admin");
        navigate("/admin");
      } else {
        console.log("not admin");
      }
    } catch (err: any) {
      if (err.status === 401) {
        verifyAuth();
      }
      toast("we got error");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userData || !userData._id) {
    return null;
  }

  return (
    <Layout>
      <Navbar />
      <Outlet />
    </Layout>
  );
}
export default Home;
