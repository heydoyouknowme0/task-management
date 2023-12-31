import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./EditProfileForm.module.scss";

function EditProfileForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  // const { verifyAuth } = useContext(AuthContext);
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

  const updateUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const editProfile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/users/me`, user);
      toast.success("Profile updated successfully");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className={classes.backBtn} onClick={() => navigate(-1)}>
        <BsArrowLeftShort />
        Home
      </button>
      <div>
        <h1>Edit Profile</h1>
        <form className={classes.editForm} onSubmit={editProfile}>
          <label htmlFor="name">
            Full Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}

export default EditProfileForm;
