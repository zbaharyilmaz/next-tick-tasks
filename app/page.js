import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

async function getData() {
  const res = await fetch("https://next-tick-tasks.vercel.app/api/task", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const Home = async () => {
  const task = await getData();
  return (
    <main>
      <AddTask />
      <section>
        <TaskList task={task} />
      </section>
    </main>
  );
};
export default Home;
