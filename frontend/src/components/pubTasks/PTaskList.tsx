import axios from "axios";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import TaskItem from "./TaskItem";
import classes from "./TaskList.module.scss";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function PTaskList() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState<Task[]>([]);

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/tasks/mytasks");
      setTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
    if (isAdmin) {
      navigate("/admin");
    }
  }, []);

  const taskListUpdateHandler = (task: Task) => {
    setTaskList((prevTaskList) => [...prevTaskList, task]);
  };

  return (
    <>
      <div className={classes.topBar}></div>
      {taskList.length > 0 ? (
        <div className={classes.divGrid}>
          {taskList.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        "No Task Found. Create a new task"
      )}
    </>
  );
}

export default PTaskList;
