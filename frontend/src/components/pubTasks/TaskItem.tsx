import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { STATUS_COLORS, OPTIONS } from "../../constants/constants";
import classes from "./TaskItem.module.scss";
import Select, { SingleValue } from "react-select";

function TaskItem({ task }: { task: Task }) {
  const handleSelectClick = async (
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
      const cardHeaderElement = document.getElementById("yourElementId");
      cardHeaderElement!!.style.backgroundColor =
        STATUS_COLORS[
          newValue!!.value as unknown as keyof typeof STATUS_COLORS
        ];
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeSubTaskStatus = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    _id: string
  ) => {
    console.log(_id);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      checked: boolean;
    };
    try {
      const newSubTasks = task.subTasks.map((subTask) => {
        if (subTask._id === _id) {
          return { ...subTask, done: !subTask.done };
        }
        return subTask;
      });
      await axios.put(`/api/tasks/${task._id}`, { subTasks: newSubTasks });
      toast.success("Task updated successfully");
      target.checked = !target.checked;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.card}>
        <div
          className={classes.card_header}
          id={task._id}
          style={{
            backgroundColor:
              STATUS_COLORS[
                task.status as unknown as keyof typeof STATUS_COLORS
              ],
          }}
        >
          {task.title}
        </div>
        <div className={classes.card_body}>
          <div className={classes.card_body_info}>
            <div className="due-date">
              <strong>Due Date:</strong>{" "}
              {moment(task.dueDate).format("Do MMM YY")}
            </div>
          </div>

          <div className={classes.card_body_description}>
            <strong>Description:</strong>
            <p>{task.content}</p>
          </div>
          <span className={classes.card_body_assigned}>
            <strong>Assigned To: </strong>
            {task.assigned.map((user, index) => (
              <span key={user._id}>
                {user.name}
                {index === task.assigned.length - 1 ? "" : ", "}
              </span>
            ))}
          </span>
          <br />
          <br />
          {task.subTasks.length ? (
            <span>
              <strong>SubTasks: </strong>
            </span>
          ) : (
            ""
          )}
          <ul className={classes.card_body_sub_tasks}>
            {task.subTasks.map((subTask) => (
              <li
                className={classes.card_body_sub_tasks_item}
                key={subTask._id || subTask.task}
              >
                <input
                  type="checkbox"
                  className={classes.card_body_sub_tasks_item_checkbox}
                  defaultChecked={subTask.done}
                  onClick={(e) => handleChangeSubTaskStatus(e, subTask._id)}
                />
                {subTask.task}
              </li>
            ))}
          </ul>

          <div className={classes.card_body_status}>
            <span className={classes.status}>Status:</span>
            <div className={classes.smallspan}>
              <Select
                options={OPTIONS}
                defaultValue={{
                  value: task.status as unknown as string,
                  label: task.status as unknown as string,
                }}
                onChange={handleSelectClick}
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
    </>
  );
}

export default TaskItem;
