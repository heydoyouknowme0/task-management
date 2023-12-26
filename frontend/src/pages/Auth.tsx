import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";
import classes from "./Auth.module.scss";
import { useEffect } from "react";

function Auth() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('/background.jpg')";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  return (
    <Layout>
      <div className={classes.form_container}>
        <Outlet />
      </div>
    </Layout>
  );
}

export default Auth;
