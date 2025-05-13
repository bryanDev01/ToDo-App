import { prisma } from "@/libs/prisma";
import { pageProps } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: pageProps) {
  const { id } = await params;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(task);
}

export async function PUT(request: Request, { params }: pageProps) {
  const { id } = await params;
  const data = await request.json();

  console.log(data)
  
  const updatedTask = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: data,
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(request: Request, { params }: pageProps) {
  const { id } = await params;
  const deletedTask = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(deletedTask);
}
