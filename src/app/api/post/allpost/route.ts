import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = parseInt(queryParams.get("page") || "1", 10);
    const pageSize = parseInt(queryParams.get("pageSize") || "10", 10);

    const skipCount = (page - 1) * pageSize;

    // Define the static category to exclude (replace 'Static Category' with your actual category name)
    const staticCategory = "Static";

    // Fetch total post count excluding the static category
    const totalPostsCount = await prisma.post.count({
      where: {
        category: {
          not: staticCategory, // Exclude posts from the static category
        },
      },
    });

    // Fetch posts excluding the static category with pagination
    const allPosts = await prisma.post.findMany({
      where: {
        category: {
          not: staticCategory,
        },
      },
      select: {
        id: true,
        title: true,
        coverImage: true,
        category: true,
        updatedAt: true,
        createdAt: true,
        content: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip: skipCount,
      take: pageSize,
    });

    // Remove HTML tags and truncate content to 180 characters
    const sanitizedAndTruncatedPosts = allPosts.map((post) => ({
      ...post,
      content: post.content.replace(/<[^>]*>/g, "").slice(0, 180),
    }));

    if (sanitizedAndTruncatedPosts.length > 0) {
      return NextResponse.json({
        posts: sanitizedAndTruncatedPosts,
        totalPostsCount,
      });
    } else {
      return new NextResponse("No posts found.", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
