import TaskCard from "@/components/TaskCard";
import { loadTasks } from "@/services/services";

export default async function Home() {
  const tasks = await loadTasks();

  return (
    <main className=" w-full h-full p-6">
      <h1 className=" text-center text-4xl text-amber-400">TASKS LIST</h1>
      <ul className=" grid grid-cols-3 w-full h-full gap-5 p-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </ul>
    </main>
  );
}
