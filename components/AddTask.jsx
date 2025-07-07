"use client";
import { toast } from "react-toastify";
import useTaskStore from "../store/taskStore";
import { useForm } from "react-hook-form";

const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const addTask = useTaskStore((state) => state.addTask);
  const onSubmit = async (data) => {
    await addTask(data);
    toast.success("Task added successfully!", { className: "text-sm" });
    reset();
  };

  return (
    <section className="max-w-85 mx-auto bg-white p-6 rounded-2xl shadow-xl shadow-black mt-8 hover:shadow-2xl transition-shadow duration-300">
      <h1 className="text-4xl font-bold text-center mb-6">T✔︎CK YOUR TASKS</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("title", { required: true })}
          placeholder="Task Title"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Task Description"
          rows={4}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-700 resize-none"
        />
        <button
          type="submit"
          className="bg-sky-400 py-2 w-30 mx-auto my-1 rounded font-semibold hover:bg-sky-500 hover:scale-[1.03] transition duration-200 cursor-pointer"
        >
          ADD TASK
        </button>
      </form>
    </section>
  );
};

export default AddTask;
