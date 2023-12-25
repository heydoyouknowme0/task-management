import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Auth from "./pages/Auth";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PTaskList from "./components/pubTasks/PTaskList";
import PrivilegeRoutes from "./components/PrivilegeRoutes";
import TaskList from "./components/task/TaskList";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.8rem",
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<PTaskList />} />
            <Route path="admin" element={<PrivilegeRoutes />}>
              <Route path="/admin" element={<TaskList />} />
            </Route>
          </Route>
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
