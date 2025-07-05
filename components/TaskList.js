import Task from "./Task";

const TaskList = ({notes}) => {
  return (
    <ul className="flex flex-wrap gap-3 justify-center mt-5 bg-white p-3 rounded-lg">
        {notes.map((note)=>{
            return <Task key={note.id} note={note}/>

        })}
    </ul>

  );
};

export default TaskList;