import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const { postId, data } = await req.json();

    // Input validation
    if (!data || !postId || !data.name || !data.comment || !data.email) {
      return new NextResponse(
        JSON.stringify({
          message: "Post ID, name, comment, and email are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Optional: Verify secret if needed
    if (!secret) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized request: secret is missing" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Check if the email is already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: {
        email: data.email,
      },
    });

    // If not subscribed, add the email to the subscribers' list
    if (!existingSubscriber) {
      await prisma.subscriber.create({
        data: {
          email: data.email,
        },
      });
    }

    // Create the new comment
    const newComment = await prisma.comment.create({
      data: {
        postId,
        name: data.name,
        email: data.email,
        comment: data.comment,
      },
    });

    // Disconnect Prisma to prevent memory leaks
    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        message: "Comment created successfully and user subscribed",
        newComment,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error creating comment:", error);

    // Disconnect Prisma in case of error
    await prisma.$disconnect();

    return new NextResponse(
      JSON.stringify({
        message: "An error occurred while creating the comment",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
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
