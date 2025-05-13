export const dynamic = 'force-dynamic';

import TaskList from "@/components/TaskList";
import { loadTasks } from "@/services/services";
import { Plus, ListTodo } from "lucide-react";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: Promise<{query?: string}>}) {
  const { query } = await searchParams
  const tasks = await loadTasks(query);  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <ListTodo className="h-12 w-12 text-indigo-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Manage Your Tasks
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stay organized and boost your productivity with our simple yet powerful task management system.
            </p>
          </div>
        </div>
      </section>
    
      <TaskList tasks={tasks}/>

      {/* Floating Action Button */}
      <Link
        href="/newTask"
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center hover:scale-110 z-50"
        title="Create New Task"
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
}