import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./AuthForm.module.scss";

function Register() {
  const navigate = useNavigate();

  const register = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
      isAdmin: { checked: boolean };
    };
    const user = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
      isAdmin: target.isAdmin.checked,
    };
    try {
      await axios.post(`/api/auth/register`, user);
      toast.success("Registered successfully");
      navigate("/auth/login");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={classes.register}>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="email" style={{ marginBottom: "0" }}>
          Welcome!
        </label>
        <h1 className={classes.title}>Create an account</h1>
        <label htmlFor="name">
          Full Name:
          <input name="name" type="text" placeholder="Full Name" required />
        </label>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
        </label>

        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </label>
        <label htmlFor="isAdmin">
          Is an admin?
          <input name="isAdmin" type="checkbox" />
        </label>
        <br />
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
