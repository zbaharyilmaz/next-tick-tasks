"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddTask = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/post", inputs)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        setInputs({});
        router.refresh();
      });
  };
  const handleChange=(e)=>{

    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  }
  return(
    <section className="mt-5 p-3 bg-white rounded-lg shadow-md">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-2xl pb-2 text-center">Add Your Task</h1>
            <input type="text" name="title" value={inputs.title || ""} onChange={handleChange} placeholder="Task Title" className="input input-bordered input-sm w-full max-w-md m-auto" />
            <input type="text" name="description" value={inputs.description || ""} onChange={handleChange} placeholder="Task Description" className="input input-bordered input-sm w-full max-w-md m-auto" />
            <button type="submit" className="btn btn-warning max-w-md m-auto">Add</button>
        </form>
    </section>
  )
};

export default AddTask;
