import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

function decodeFromUrl(encodedStr: string) {
  return decodeURIComponent(encodedStr.replace(/-/g, " "));
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const encodedCategory = queryParams.get("category");
    const createdAt = queryParams.get("createdAt");
    const encodedTitle = queryParams.get("title");

    if (!encodedCategory || !encodedTitle || !createdAt) {
      return new NextResponse("Category, title, or createdAt not provided", {
        status: 400,
      });
    }

    const category = decodeFromUrl(encodedCategory);
    const title = decodeFromUrl(encodedTitle);

    const response = await prisma.post.findFirst({
      where: {
        category: {
          mode: "insensitive",
          equals: category,
        },
        title: {
          mode: "insensitive",
          equals: title,
        },
        createdAt: {
          gte: new Date(`${createdAt}T00:00:00.000Z`),
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!response) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Error in API route:", error);

    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Step 1: Authenticate the user
    const token = await getToken({ req, secret });
    const userId = token?.sub;

    if (!token || !userId) {
      // User is not authenticated
      return new NextResponse("User not authenticated", { status: 401 });
    }

    // Extract postId from query parameters
    const postId = req.nextUrl.searchParams.get("postId");

    if (!postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    // Step 2: Fetch the post details
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        coverImage: true,
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    const authorId = post.author.id;

    // Step 3: Check authorization
    if (userId !== authorId) {
      return new NextResponse(
        "Unauthorized: You can only delete your own posts",
        { status: 403 }, // Changed to 403 (Forbidden)
      );
    }

    // Step 4: Delete associated comments first
    await prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });

    // Step 5: Delete the cover image if it exists
    if (post.coverImage) {
      try {
        const previousImageRef = ref(storage, post.coverImage);
        await deleteObject(previousImageRef);
      } catch (firebaseError) {
        return new NextResponse("Error deleting cover image", { status: 500 });
      }
    }

    // Step 6: Delete the post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
