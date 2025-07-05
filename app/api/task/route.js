import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
