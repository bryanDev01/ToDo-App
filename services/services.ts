import { Task } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function loadTasks(term?: string | undefined) {
  try {
    const tasks: Task[] = await prisma.task.findMany();
    if (term === undefined) return tasks;
    else {
      return tasks.filter((task) =>
        task.title.toLowerCase().startsWith(term.toLowerCase()),
      );
    }
  } catch (e: any) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error...");
    }
  }
}
