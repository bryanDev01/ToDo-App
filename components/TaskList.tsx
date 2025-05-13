"use client";

import { Task } from "@prisma/client";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [idDeleteTask, setIdDeleteTask] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setIdDeleteTask(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await fetch(`api/tasks/${idDeleteTask}`, {
      method: "DELETE",
    });
    router.refresh();
    setShowModal(false);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-100">Your Tasks</h2>
          <span className="text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full text-sm">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} onDeleteClick={handleDelete} />
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              No tasks yet. Start by creating one!
            </p>
          </div>
        )}
      </div>
      <div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="group select-none w-[250px] flex flex-col p-4 absolute items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
              <div className="">
                <div className="text-center p-3 flex-auto justify-center">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <h2 className="text-xl font-bold py-4 text-gray-200">
                    Are you sure?
                  </h2>
                  <p className="font-bold text-sm text-gray-500 px-2">
                    Do you really want to continue ? This process cannot be
                    undone
                  </p>
                </div>
                <div className=" flex flex-col justify-center items-center p-2 gap-3">
                  <button
                    className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 hover:bg-transparent px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                    onClick={handleConfirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TaskList;
