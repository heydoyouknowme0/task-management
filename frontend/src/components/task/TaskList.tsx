import axios from "axios";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import TaskItem from "./TaskItem";
import classes from "../pubTasks/TaskList.module.scss";
import AddTaskButton from "./AddTaskButton";

function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [userData, setUserData] = useState<{ value: string; label: string }[]>(
    []
  );
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`/api/admins/`);
      const reactSelectOptions = data.map(
        (item: { _id: string; name: string }) => ({
          value: item._id,
          label: item.name,
        })
      );
      setUserData(reactSelectOptions);
      console.log(data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/api/admins/mytasks");
      setTaskList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getTasks();
  }, []);

  const taskListUpdateHandler = (task: Task) => {
    setTaskList((prevTaskList) => [...prevTaskList, task]);
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/api/admins/${id}`);
      toast.success("Task deleted");
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.topBar}></div>
      {taskList.length > 0 ? (
        <div className={classes.divGrid}>
          {taskList.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              deleteTask={deleteTask}
              userData={userData}
            />
          ))}
        </div>
      ) : (
        "No Task Found. Create a new task"
      )}
      <AddTaskButton
        taskListUpdateHandler={taskListUpdateHandler}
        userData={userData}
      />
    </>
  );
}

export default TaskList;
