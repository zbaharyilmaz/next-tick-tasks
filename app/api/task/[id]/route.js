import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    const post = await prisma.task.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "GET Error" }, { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description } = body;

    const updatePost = await prisma.task.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updatePost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "PATCH Error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "DELETE Error" }, { status: 500 });
  }
};
