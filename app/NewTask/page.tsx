"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Params } from "next/dist/server/request/params";
import { Task } from "@prisma/client";

function NewTasks({ params }: { params: Params }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | null>("");
  const [deleteButton, setDeleteButton] = useState<ReactNode>(null);

  async function getParams() {
    const { id } = await params;
    return id;
  }

  useEffect(() => {
    const getDefaultData = async () => {
      const paramId = await getParams();
      if (paramId) {
        const res = await fetch(`/api/tasks/${paramId}`);
        const data: Task = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        const deleteButton = (
          <button
            className=" py-2 px-4 bg-rose-500 text-center text-white outline-none border-none rounded-lg cursor-pointer "
            type="button"
            onClick={async () => {
              await fetch(`/api/tasks/${paramId}`, { method: "DELETE" });
              router.push("/")
            }}
          >
            Delete
          </button>
        );
        setDeleteButton(deleteButton);
      }
    };

    getDefaultData();
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const paramId = await getParams;
    if (paramId) {
      const res = await fetch(`/api/tasks/${paramId}`, {
        headers: {
          "Content-Type": "aplication/json",
        },
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      console.log("Datos editados: ", data);
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
        }),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();
      console.log("Datos creados correctamente", data);
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className=" bg-slate-950 w-full h-screen flex items-center justify-center text-black">
      <form
        className=" w-[600px] flex flex-col justify-center items-center bg-cyan-600 rounded-lg p-4 gap-4"
        onSubmit={handleSubmit}
      >
        <div className=" flex w-3/4 flex-col items-center gap-1.5">
          <label
            htmlFor="title"
            className=" font-bold text-sm text-white self-start"
          >
            Task title
          </label>
          <input
            name="taskTitle"
            type="text"
            id="title"
            className=" bg-white rounded-md w-full mb-7  p-2"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className=" flex w-3/4 flex-col items-center gap-1.5">
          {" "}
          <label
            htmlFor="description"
            className=" font-bold text-sm text-white self-start"
          >
            Task description
          </label>
          <textarea
            name="taskDescription"
            id="description"
            className=" bg-white rounded-md w-full mb-7 p-2"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <button
          className=" py-2 px-4 bg-emerald-300 text-center text-white outline-none border-none rounded-lg cursor-pointer"
          type="submit"
        >
          Send
        </button>
        {deleteButton}
      </form>
    </div>
  );
}

export default NewTasks;
