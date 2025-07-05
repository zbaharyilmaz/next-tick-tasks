import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { title, description } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: "POST Error", error }, { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ message: "GET Error", error }, { status: 500 });
  }
};
