"use client";
import Task from "./Task";
import useTaskStore from "../store/taskStore";
import { useEffect } from "react";

const TaskList = () => {
  const {tasks, fetchTasks} = useTaskStore();
  useEffect(()=>{
    fetchTasks()
  },[])

  return (
    <ul className="flex flex-wrap justify-center gap-6 mt-8 px-4">
      {tasks?.length > 0 ? (
        tasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </ul>
  );
};

export default TaskList;
