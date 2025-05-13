"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Task, Priority } from "@prisma/client";
import { pageProps } from "@/types/types";
import { Save, Trash2 } from "lucide-react";

function NewTasks({ params }: pageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getDefaultData = async () => {
      const paramId = (await params)?.id;
      if (paramId) {
        setIsEditing(true);
        const res = await fetch(`/api/tasks/${paramId}`);
        const data: Task = await res.json();
        setTitle(data.title);
        setDescription(data.description || "");
        setPriority(data.priority);
      }
      setLoading(false);
    };

    if (!title && !description) getDefaultData();
    else setLoading(false);
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSent) return;

    const paramId = (await params)?.id;

    setIsSent(true);
    try {
      if (paramId) {
        await fetch(`/api/tasks/${paramId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            priority,
          }),
        });
      } else {
        await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            priority,
          }),
        });
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    const paramId = (await params)?.id;
    if (paramId) {
      await fetch(`/api/tasks/${paramId}`, { method: "DELETE" });
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700/50">
          <h1 className="text-2xl font-bold text-gray-100 mb-6">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Task Title
              </label>
              <input
                id="title"
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="Enter task title"
                disabled={loading ? true : false}
                value={loading ? "Loading....." : title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="Enter task description"
                disabled={loading ? true : false}
                value={loading ? "Loading....." : description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                disabled={loading}
              >
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
                <option value={Priority.Top}>Top</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading ? true : false}
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              )}
              <button
                type="submit"
                disabled={loading || isSent} // Deshabilita durante carga o envío
                className={`flex items-center px-4 py-2 ${
                  isSent
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white rounded-lg transition-colors`}
              >
                {isSent ? (
                  "Processing..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? "Save Changes" : "Create Task"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTasks;
