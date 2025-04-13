import { Task } from "@prisma/client"

export async function loadTasks() {
    const response = await fetch("http://localhost:3000/api/tasks")
    const tasks: Task[] = await response.json()
    return tasks
}