import { useRouter } from "next/navigation";
import { Calendar, ChevronRight, CrossIcon, Trash2 } from "lucide-react";
import { Task, Priority } from "@prisma/client";
import { useState } from "react";

function TaskCard({ task, onDeleteClick }: { task: Task, onDeleteClick: (id: number) => void }) {
  const [isDone, setIsDone] = useState<boolean>(task.done);
  const router = useRouter();

  const handleCheck = async () => {
    const newDoneState = !isDone;
    setIsDone(newDoneState);
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: newDoneState,
      }),
    });
  };

  return (
    <div
      className={
        isDone
          ? "group bg-gray-400/80 backdrop-blur-sm rounded-xl p-6 hover:scale-95 not-last:transition-all duration-300 border border-gray-700/50"
          : "group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:scale-95 not-last:transition-all duration-300 border border-gray-700/50"
      }
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className=" flex gap-8 justify-between items-center">
            <h2
              className={
                isDone
                  ? "text-xl font-semibold mb-2 line-clamp-1 line-through"
                  : "text-xl font-semibold text-gray-100 mb-2 line-clamp-1"
              }
            >
              {task.title}
            </h2>
            <input
              type="checkbox"
              className=" rounded-full"
              defaultChecked={isDone}
              onChange={handleCheck}
            />
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">
            {task.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Today</span>
            </div>
            <div className={`text-sm px-2 py-0.5 rounded ${task.priority === Priority.High ? 'bg-rose-500/60 text-red-300' : task.priority === Priority.Medium ? 'bg-yellow-500/20 text-yellow-300' : task.priority === Priority.Low ? 'bg-blue-500/20 text-blue-300' : 'bg-red-600/60 text-red-200'}`}>
              {task.priority.toLowerCase()}
            </div>
          </div>
          <div className=" flex gap-3 justify-center items-center">
            <button
              className={
                isDone
                  ? " bg-red-800 rounded-full px-3 py-1 flex gap-2 justify-center items-center transition-all duration-300 cursor-pointer "
                  : " bg-slate-800 rounded-full px-3 py-1 flex gap-2 justify-center items-center hover:bg-gray-600/50 transition-all duration-300 cursor-pointer "
              }
              onClick={() => router.push(`/edit/task/${task.id}`)}
              disabled={isDone ? true : false}
            >
              <span className=" font-semibold">Edit</span>
              {isDone ? (
                <CrossIcon className="w-5 h-5 text-white rotate-45" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 transition-colors" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                onDeleteClick(task.id)
              }}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
              disabled={isDone ? true : false}
            >
              <Trash2 className="w-4 h-4 mx-auto" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskCard;
