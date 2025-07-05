"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Task = ({ task }) => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task);
  const editForm = () => {
    setVisibility((visibility) => !visibility);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/post/${task.id}`, taskToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.refresh();
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTaskToEdit((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDelete = (e) => {
    axios
      .delete(`/api/post/${task.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  return (
    <div>
      <li className="card text-primary-content bg-base-150 w-75">
        <div className="card-body">
          <h2 className="card-title">{task.title}</h2>
          <p className="card-text">{task.description}</p>
          <div className="pt-6">
            <button
              className="btn btn-primary btn-sm mr-3 ml-3 rounded-md text-center"
              onClick={(e) => editForm()}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm mr-3 ml-3 rounded-md text-center"
              onClick={(e) => handleDelete()}
            >
              Delete
            </button>
            {visibility && (
              <div>
                <h2 className="text-center">Update Note</h2>
                <form
                  onSubmit={handleEditSubmit}
                  className="bg-warning mt-1 p-4 rounded-lg flex-col"
                >
                  <div>
                    <input
                      value={noteToEdit.title || ""}
                      onChange={handleChange}
                      className="p-4 w-full outline-none"
                      type="text"
                      id="title"
                    />
                  </div>
                  <div>
                    <input
                      value={noteToEdit.description || ""}
                      onChange={handleChange}
                      name="description"
                      className="p-4 w-full mt-3 outline-none"
                      type="text"
                      id="description"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-sm mr-3 bg-lime-700 mt-2 p-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setVisibility((visibility) => !visibility)}
                    className="btn btn-sm mr-3 bg-rose-600 mt-2 p-2 rounded-md"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  );
};

export default Task;
