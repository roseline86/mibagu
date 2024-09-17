import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    // Get the total count of all posts
    const totalPoll = await prisma.poll.count();

    // Calculate the start and end date of this month
    const startDateThisMonth = new Date();
    startDateThisMonth.setDate(1);
    startDateThisMonth.setHours(0, 0, 0, 0);

    const endDateThisMonth = new Date();
    endDateThisMonth.setDate(1);
    endDateThisMonth.setMonth(endDateThisMonth.getMonth() + 1);
    endDateThisMonth.setHours(0, 0, 0, 0);

    // Get the count of posts created between start and end date of this month
    const thisMonthPosts = await prisma.poll.count({
      where: {
        createdAt: {
          gte: startDateThisMonth,
          lt: endDateThisMonth,
        },
      },
    });

    // Calculate the start and end date of last month
    const startDateLastMonth = new Date();
    startDateLastMonth.setMonth(startDateLastMonth.getMonth() - 1);
    startDateLastMonth.setDate(1);
    startDateLastMonth.setHours(0, 0, 0, 0);

    const endDateLastMonth = new Date();
    endDateLastMonth.setDate(1);
    endDateLastMonth.setHours(0, 0, 0, 0);

    // Get the count of posts created between start and end date of last month
    const lastMonthPosts = await prisma.poll.count({
      where: {
        createdAt: {
          gte: startDateLastMonth,
          lt: endDateLastMonth,
        },
      },
    });

    // Calculate the percentage of posts from this month compared to total posts from last month
    let percentage;
    if (lastMonthPosts === 0) {
      percentage = 0; // Handle division by zero
    } else {
      percentage = ((thisMonthPosts / lastMonthPosts) * 100).toFixed(2);
    }

    // Prepare response object with totalPosts and percentage only
    const responseData = {
      totalPoll,
      percentage,
    };

    return new NextResponse(JSON.stringify(responseData));
  } catch (error) {
    return new NextResponse("API is not working", { status: 400 });
  }
}
