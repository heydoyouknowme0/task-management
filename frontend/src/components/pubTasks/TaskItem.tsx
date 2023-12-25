import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./TaskItem.module.scss";
import Select, { SingleValue } from "react-select";

function TaskItem({ task }: { task: Task }) {
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

  return (
    <>
      <div className={classes.card}>
        <div className={classes.card_header}>{task.title}</div>
        <div className={classes.card_body}>
          <div className={classes.card_body_info}>
            <div className="due-date">
              Due Date: {moment(task.dueDate).format("Do MMM YY")}
            </div>
          </div>

          <div className={classes.card_body_description}>
            <strong>Description:</strong>
            <p>{task.content}</p>
          </div>
          <span>
            <strong>Assigned To: </strong>
            {task.assigned.map((user) => (
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
    </>
  );
}

export default TaskItem;
