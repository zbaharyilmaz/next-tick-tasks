import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const Home = async () => {
  const notes = await getData();
  return (
    <main>
      <AddTask />
      <section>
        <TaskList notes={notes} />
      </section>
    </main>
  );
};
export default Home;
