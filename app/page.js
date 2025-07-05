import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/task", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const Home = async () => {
  const tasks = await getData();
  return (
    <main>
      <AddTask />
      <section>
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
};
export default Home;
