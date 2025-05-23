import { prisma } from "@/libs/prisma";
import { Task } from "@prisma/client";

export async function loadTasks(term?: string | undefined) {
  const tasks: Task[] = await prisma.task.findMany();
  if(term === undefined) return tasks
  else {
    return tasks.filter(task => task.title.toLowerCase().startsWith(term.toLowerCase()))
  }
}
