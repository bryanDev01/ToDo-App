// app/Edit/Task/[id]/page.tsx
import { pageProps, Task } from "@/types/types";
import dynamic from "next/dynamic";

const getDefaultData = async (params: pageProps) => {
    const paramId = (await params.params)?.id;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:3000`) 
    if (paramId) {  
      const res = await fetch(`${baseUrl}/api/tasks/${paramId}`);
      const data: Task = await res.json();
      return data;
    }
    else{ 
      return
    }
  };

const NewTasks = dynamic(() => import("@/app/newTask/page"));

export default async function EditTaskPage(params: pageProps) {
  const editData = await getDefaultData(params);

  return <NewTasks params={params} editData={editData ?? null} />;
}
