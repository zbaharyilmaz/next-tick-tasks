"use client";
import { useState } from "react";
import useTaskStore from "../store/taskStore";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

const Task = ({ task }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description || "",
    },
  });
  const openModal = () => {
    reset({
      title: task.title,
      description: task.description || "",
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmit = async (data) => {
    await updateTask(task.id, data);
    toast.success("Task updated successfully!", { className: "text-sm" });
    closeModal();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    toast.success("Task deleted successfully!", { className: "text-sm" });
  };

  return (
    <li className="bg-white rounded-lg shadow-md w-72 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div>
        <h2 className="text-xl font-semibold mb-2 truncate">{task.title}</h2>
        <p className="text-gray-600 mb-4 min-h-[3rem]">
          {task.description || "No description"}
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={openModal}
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>

      {modalVisible && (
        <Modal onClose={closeModal}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <textarea
              placeholder="Description"
              rows={3}
              {...register("description")}
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
                onClick={closeModal}
                className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </li>
  );
};

export default Task;
