import { useState } from "react";
import Select, { MultiValue } from "react-select";
import classes from "./AddTaskButton.module.scss";
import axios from "axios";
interface FormData {
  title: string;
  content: string;
  dueDate: string;
  subTasks: { task: string; done: boolean }[];
  assigned: string[];
}
const AddTaskButton = ({
  taskListUpdateHandler,
  userData,
}: {
  taskListUpdateHandler: (task: Task) => void;
  userData: { value: string; label: string }[];
}) => {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    dueDate: "",
    subTasks: [{ task: "", done: false }],
    assigned: [],
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleModalClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/admins/", formData);
      console.log("Task created:", response.data);
      taskListUpdateHandler(response.data as Task);
    } catch (error) {
      console.error("Error creating task:", error);
    }
    console.log(formData);

    setFormData({
      title: "",
      content: "",
      dueDate: "",
      subTasks: [{ task: "", done: false }],
      assigned: [],
    });

    setShowForm(false);
  };

  const handleUserSelectChange = (
    selectedOption: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedUserIds = selectedOption.map((option) => option.value);
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
    <div>
      <button className={classes.addTaskButton} onClick={handleButtonClick}>
        +
      </button>
      {showForm && (
        <div className={classes.modalOverlay} onClick={handleModalClose}>
          <form
            className={classes.addTaskForm}
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
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </label>
            <label>
              Subtasks:
              {formData.subTasks.map((subTask, index) => (
                <div className={classes.subTasks} key={index}>
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
              className={classes.selectMulti}
              options={userData}
              onChange={handleUserSelectChange}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTaskButton;
