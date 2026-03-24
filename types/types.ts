import { Priority } from "@prisma/client";

type paramsType = Promise<{ id: string }>;

export interface pageProps {
    params: paramsType
}

export type Task = {
    title: string
    description: string
    priority: Priority
}
