import axios from "axios";
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/api/task");
      set({ tasks: res.data, loading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ loading: false });
    }
  },
  addTask: async (taskData) => {
    try {
      const res = await axios.post("/api/task", taskData);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },
  updateTask: async (id, updatedData) => {
    try {
      const res = await axios.patch(`/api/task/${id}`, updatedData);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? res.data : task)),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },
  deleteTask: async (id) => {
    try {
      await axios.delete(`/api/task/${id}`);
      set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
  toggleTaskCompletion: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));
export default useTaskStore;
