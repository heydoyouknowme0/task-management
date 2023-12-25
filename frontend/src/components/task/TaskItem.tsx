import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./TaskItem.module.scss";
import Select, { MultiValue, SingleValue } from "react-select";
import myClasses from "./AddTaskButton.module.scss";
import { useState } from "react";
interface FormData {
  title: string;
  content: string;
  dueDate: string;
  subTasks: { task: string; done: boolean; _id?: string }[];
  assigned: { name: string; _id: string }[];
}
function TaskItem({
  task,
  deleteTask,
  userData,
}: {
  task: Task;
  deleteTask: any;
  userData: { value: string; label: string }[];
}) {
  const options = [
    { value: "todo", label: "todo" },
    { value: "inProgress", label: "inProgress" },
    { value: "up for review", label: "up for review" },
    { value: "done", label: "done" },
  ];

  const handleCheckboxClick = async (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    try {
      await axios.put(`/api/tasks/${task._id}`, {
        status: newValue!!.value,
      });
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: task.title,
    content: task.content,
    dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
    subTasks: task.subTasks,
    assigned: task.assigned,
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleModalClose = () => {
    setShowForm(false);
    setFormData({
      title: task.title,
      content: task.content,
      dueDate: moment(task.dueDate).format("YYYY-MM-DD"),
      subTasks: task.subTasks,
      assigned: task.assigned,
    });
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const editformData = {
        title: formData.title,
        content: formData.content,
        dueDate: formData.dueDate,
        assigned: formData.assigned.map((user) => user._id),
        subTasks: formData.subTasks,
      };
      console.log(editformData);
      const response = await axios.put(`/api/tasks/${task._id}`, editformData);
      console.log("Task created:", response.data);
      setFormData(response.data as FormData);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    console.log(formData);

    setShowForm(false);
  };

  const handleUserSelectChange = (
    selectedOption: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedUserIds = selectedOption.map((option) => ({
      _id: option.value,
      name: option.label,
    }));
    setFormData({ ...formData, assigned: selectedUserIds });
  };
  const handleSubTaskChange = (index: number, value: string) => {
    const updatedSubTasks = [...formData.subTasks];
    updatedSubTasks[index].task = value;
    setFormData({ ...formData, subTasks: updatedSubTasks });
  };

  const handleAddSubTask = () => {
    setFormData({
      ...formData,
      subTasks: [...formData.subTasks, { task: "", done: false }],
    });
  };

  const handleRemoveSubTask = (index: number) => {
    const updatedSubTasks = [...formData.subTasks];
    updatedSubTasks.splice(index, 1);
    setFormData({ ...formData, subTasks: updatedSubTasks });
  };

  return (
    <>
      <div className={classes.card}>
        <div className={classes.card_header}>
          <button
            type="button"
            className={classes.editBtn}
            onClick={handleButtonClick}
          >
            ✏️
          </button>
          {formData.title}{" "}
          <button
            type="button"
            className={classes.deleteBtn}
            onClick={() => deleteTask(task._id)}
          >
            🗑
          </button>
        </div>
        <div className={classes.card_body}>
          <div className={classes.card_body_info}>
            <div className="due-date">
              Due Date: {moment(formData.dueDate).format("Do MMM YY")}
            </div>
          </div>

          <div className={classes.card_body_description}>
            <strong>Description:</strong>
            <p>{formData.content}</p>
          </div>
          <span>
            <strong>Assigned To: </strong>
            {formData.assigned.map((user) => (
              <span className={classes.card_body_assigned} key={user._id}>
                {user.name},{" "}
              </span>
            ))}
          </span>
          <ul className={classes.card_body_sub_tasks}>
            {task.subTasks.map((subTask) => (
              <li
                className={classes.card_body_sub_tasks_item}
                key={subTask.task}
              >
                <input
                  type="checkbox"
                  className={classes.card_body_sub_tasks_item_checkbox}
                  defaultChecked={subTask.done}
                />
                {subTask.task}
              </li>
            ))}
          </ul>

          <div className={classes.card_body_status}>
            <span className={classes.status}>Status:</span>
            <div className={classes.smallspan}>
              <Select
                options={options}
                defaultValue={{
                  value: task.status as unknown as string,
                  label: task.status as unknown as string,
                }}
                onChange={handleCheckboxClick}
                menuPortalTarget={document.querySelector("body")}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 20,
                  colors: {
                    ...theme.colors,
                    primary25: "hotpink",
                    primary: "white",
                    neutral0: "#121212",
                    neutral80: "white",
                  },
                })}
              />
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className={myClasses.modalOverlay} onClick={handleModalClose}>
          <form
            className={myClasses.addTaskForm}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleFormSubmit}
          >
            <h1>Add Task</h1>
            <label>
              Title:
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </label>
            <label>
              Content:
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => {
                  setFormData({ ...formData, dueDate: e.target.value });
                  console.log(e.target.value);
                }}
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
            <label>
              Subtasks:
              {formData.subTasks.map((subTask, index) => (
                <div className={myClasses.subTasks} key={subTask._id}>
                  <input
                    type="text"
                    value={subTask.task}
                    onChange={(e) => handleSubTaskChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSubTask(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddSubTask}>
                Add Subtask
              </button>
            </label>
            <label>Assign to Users:</label>

            <Select
              isMulti
              className={myClasses.selectMulti}
              options={userData}
              defaultValue={task.assigned.map((user) => ({
                value: user._id,
                label: user.name,
              }))}
              onChange={handleUserSelectChange}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </>
  );
}

export default TaskItem;
