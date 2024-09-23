import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = Math.max(parseInt(queryParams.get("page") || "1", 10), 1);
    const pageSize = Math.max(
      parseInt(queryParams.get("pageSize") || "10", 10),
      1,
    );

    const skipCount = (page - 1) * pageSize;

    // Define the categories to exclude
    const excludedCategories = ["Static", "Courses"];

    // Fetch total post count excluding the specified categories
    const totalPostsCount = await prisma.post.count({
      where: {
        category: {
          notIn: excludedCategories,
        },
      },
    });

    // Fetch posts excluding the specified categories with pagination
    const allPosts = await prisma.post.findMany({
      where: {
        category: {
          notIn: excludedCategories,
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
      content: post.content
        ? post.content.replace(/<[^>]*>/g, "").slice(0, 180)
        : "",
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
    return new NextResponse(`Error fetching posts`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
