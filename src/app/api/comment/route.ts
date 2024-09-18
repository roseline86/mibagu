import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { postId, data } = await req.json();

    if (!data || !postId || !data.name) {
      return new NextResponse(
        JSON.stringify({ message: "Content and postId are required" }),
        { status: 400 },
      );
    }

    // Ensure the data structure matches the Prisma schema
    const newComment = await prisma.comment.create({
      data: {
        postId,
        name: data.name,
        email: data.email,
        comment: data.comment,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment created successfully", newComment }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return new NextResponse(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl;
    const postId = search.searchParams.get("id");

    if (!postId) {
      return new NextResponse("PostId is required", {
        status: 400,
      });
    }
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        comment: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const search = req.nextUrl;
    const commentId = search.searchParams.get("id");

    if (!commentId) {
      return new NextResponse("CommentId is required", {
        status: 400,
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      return new NextResponse("Comment not found", {
        status: 404,
      });
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    return new NextResponse("An error occurred", { status: 500 });
  }
}
