import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { search } = req.nextUrl;

    const comments = await prisma.comment.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
        post: {
          select: {
            title: true,
            category: true,
            createdAt: true,
            coverImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
