import classes from "./Layout.module.scss";

function Layout({ children }: { children: React.ReactNode }) {
  return <main className={classes.container}>{children}</main>;
}

export default Layout;
