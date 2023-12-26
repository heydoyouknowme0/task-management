import axios from "axios";
import { useState, useEffect } from "react";

import TaskItem from "./TaskItem";
import classes from "./TaskList.module.scss";

function PTaskList() {
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
  }, []);

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
