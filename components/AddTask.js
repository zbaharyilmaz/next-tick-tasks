"use client";
import { useState } from "react";
import useTaskStore from "../store/taskStore";

const AddTask = () => {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask(inputs);
    setInputs({title:"", description: ""});
    alert("Task added successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add Your Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          value={inputs.description}
          onChange={handleChange}
          placeholder="Task Description"
          rows={4}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white py-3 rounded font-semibold hover:bg-yellow-600 transition"
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default AddTask;
