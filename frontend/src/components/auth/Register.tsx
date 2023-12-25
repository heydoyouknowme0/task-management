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
      teamCode: { value: string };
    };

    const trimmedName = target.name.value.trim();
    const trimmedEmail = target.email.value.trim();
    const trimmedPassword = target.password.value.trim();
    const trimmedTeamCode = target.teamCode.value.trim().toLocaleLowerCase();

    const user = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      isAdmin: target.isAdmin.checked,
      teamCode: trimmedTeamCode,
    };

    try {
      await axios.post(`/api/auth/register`, user);
      toast.success("Registered successfully");
      navigate("/auth/login");
    } catch (err) {
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
          Email:
          <input name="email" type="email" placeholder="Email" required />
        </label>

        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </label>

        <label htmlFor="teamCode">
          Team Code:
          <input name="teamCode" type="text" placeholder="Team Code" required />
        </label>

        <label htmlFor="isAdmin">
          Is an admin?{"  "}
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
