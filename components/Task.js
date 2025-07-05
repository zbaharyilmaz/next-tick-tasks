"use client";
import { useState } from "react";
import useTaskStore from "../store/taskStore";


const Task = ({ task }) => {
  const [visibility, setVisibility] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task);
  const updateTask= useTaskStore((state)=> state.updateTask);
  const deleteTask= useTaskStore((state)=>state.deleteTask);

  const toggleEdit = () => setVisibility(!visibility);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task.id, taskToEdit)
    setVisibility(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit((prev) => ({ ...prev, [name]: value }));

  };

  const handleDelete = async () => {
    await deleteTask(task.id)
    alert("Task deleted successfully!");
  };

  return (
    <li className="bg-white rounded-lg shadow-md w-72 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div>
        <h2 className="text-xl font-semibold mb-2 truncate">{task.title}</h2>
        <p className="text-gray-600 mb-4 min-h-[3rem]">{task.description || "No description"}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={toggleEdit}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {visibility ? "Close" : "Edit"}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>

      {visibility && (
        <form onSubmit={handleEditSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="title"
            value={taskToEdit.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={taskToEdit.description || ""}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={toggleEdit}
              className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </li>
  );
};

export default Task;
