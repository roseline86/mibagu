import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const categories = await prisma.post.findMany({
      select: {
        category: true, // Select only the category field
      },
      distinct: ["category"], // Get distinct categories
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
