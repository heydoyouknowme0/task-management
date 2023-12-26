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

  const taskListUpdateHandler = (newTask: Task) => {
    const updatedTaskList = [...taskList];

    const newTaskIndex = updatedTaskList.findIndex(
      (task) => task.dueDate <= newTask.dueDate
    );

    if (newTaskIndex !== -1) {
      updatedTaskList.splice(newTaskIndex, 0, newTask);
    } else {
      updatedTaskList.push(newTask);
    }

    setTaskList(updatedTaskList);
  };
  const updatePosition = (task: Task) => {
    const updatedTaskList = [...taskList];

    const taskIndex = updatedTaskList.findIndex((t) => t._id === task._id);

    if (taskIndex !== -1) {
      const removedTask = updatedTaskList.splice(taskIndex, 1)[0];

      const newTaskIndex = updatedTaskList.findIndex(
        (t) => t.dueDate <= task.dueDate
      );

      if (newTaskIndex !== -1) {
        updatedTaskList.splice(newTaskIndex, 0, removedTask);
      } else {
        updatedTaskList.push(removedTask);
      }

      setTaskList(updatedTaskList);
    }
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
              updatePostion={updatePosition}
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
