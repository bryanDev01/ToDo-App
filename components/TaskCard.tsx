"use client"

import { Tasks } from "@/types/types";
import { useRouter } from "next/navigation";

function TaskCard( {task}: {task: Tasks}) {
    const router = useRouter()

  return (
    <li
      key={task.id}
      className=" flex flex-col p-3 gap-4 shadow-lg shadow-black bg-slate-800 hover:bg-slate-600 cursor-pointer"
      onClick={() => router.push(`/Edit/Task/${task.id}`)}
    >
      <h2 className=" text-2xl text-red-600 font-semibold">{task.title}</h2>
      <p className=" text-sm font-bold text-pretty">{task.description}</p>
    </li>
  );
}

export default TaskCard;
