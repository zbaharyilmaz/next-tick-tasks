"use client";
import Task from "./Task";
import useTaskStore from "../store/taskStore";
import { useEffect } from "react";

const TaskList = () => {
  const { tasks, fetchTasks } = useTaskStore();
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul className="flex flex-wrap justify-center gap-7 mt-9 px-4 mb-5">
      {tasks?.length > 0 ? (
        tasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <p className="text-2xl text-center mt-6">No tasks found.</p>
      )}
    </ul>
  );
};

export default TaskList;
