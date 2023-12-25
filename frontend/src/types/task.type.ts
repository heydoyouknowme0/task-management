type Task = {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
  user?: string;
  subTasks: [
    {
      _id: string;
      task: string;
      done: boolean;
    }
  ];
  dueDate: Date;
  status: ["todo", "inProgress", "up for review", "done"];
  assigned: { name: string; _id: string }[];
};
