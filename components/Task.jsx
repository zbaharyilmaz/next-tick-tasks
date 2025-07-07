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
  const toggleTaskCompletion = useTaskStore(
    (state) => state.toggleTaskCompletion
  );

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
  const handleToggle = () => {
    toggleTaskCompletion(task.id);
    !task.completed
      ? toast.success("Task completed!", { className: "text-sm" })
      : toast.warning("Task uncompleted!", { className: "text-sm" });
  };

  return (
    <li
      className={`bg-white rounded-lg shadow-md max-w-60 p-6 flex flex-col justify-between shadow-black mx-2 transition duration-300 ${
        task.completed ? "opacity-50 line-through" : ""
      }`}
    >
      <div className="flex justify-start gap-3 mb-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="w-5 h-5 border-gray-300 rounded cursor-pointer"
        />
        <h2 className="text-xl font-semibold mb-2 truncate">{task.title}</h2>
      </div>
      <p className="text-gray-600 mb-3 min-h-[3rem]">
        {task.description || "No description"}
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={openModal}
          className="flex-1 px-4 py-1 bg-amber-400 w-20 letter-spacing-1 text-xl rounded hover:bg-amber-500 hover:scale-[1.03] transition duration-200 cursor-pointer"
        >
          EDIT
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-1 bg-pink-500 text-white letter-spacing-1 text-xl  rounded hover:bg-pink-600 hover:scale-[1.03] transition duration-200 cursor-pointer"
        >
          DELETE
        </button>
      </div>

      {modalVisible && (
        <Modal onClose={closeModal}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <textarea
              placeholder="Description"
              rows={3}
              {...register("description")}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-1 bg-amber-400 rounded letter-spacing-1 text-xl  hover:bg-amber-500 hover:scale-[1.03] transition duration-200 cursor-pointer"
              >
                UPDATE
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-1 bg-pink-500 text-white rounded letter-spacing-1 text-xl  hover:bg-pink-600 hover:scale-[1.03] transition duration-200 cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </form>
        </Modal>
      )}
    </li>
  );
};

export default Task;
