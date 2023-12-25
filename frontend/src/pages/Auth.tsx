import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import classes from "./Auth.module.scss";

function Auth() {
  return (
    <Layout>
      <div className={classes.form_container}>
        <Outlet />
      </div>
    </Layout>
  );
}

export default Auth;
