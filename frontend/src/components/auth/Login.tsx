import { useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import classes from "./AuthForm.module.scss";

function Login() {
  const { verifyAuth, isAdmin, auth } = useAuth();
  const navigate = useNavigate();
  const redirect = async () => {
    await verifyAuth();
    if (auth) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    redirect();
    console.log(isAdmin);
  }, []);

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });
      await verifyAuth();
      console.log(isAdmin);
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      verifyAuth();
    }
  };
  return (
    <div className={classes.login}>
      <form className={classes.authForm} onSubmit={login}>
        <h1 className={classes.title}>Login</h1>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/auth/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
