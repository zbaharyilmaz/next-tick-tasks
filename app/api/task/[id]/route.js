import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    const post = await prisma.task.findUnique({
      where: {
        id: new ObjectId(id),
      },
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

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const updatePost = await prisma.task.update({
      where: {
        id: new ObjectId(id),
      },
      data: {
        title,
        description,
      },
    });

    if (!updatePost) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatePost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "PATCH Error" }, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }
    await prisma.task.delete({
      where: {
        id: new ObjectId(id),
      },
    });
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "DELETE Error" }, { status: 500 });
  }
};
