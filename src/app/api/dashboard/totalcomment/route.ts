import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    // Get the total count of all comments
    const totalComments = await prisma.comment.count();

    // Calculate the start and end date of this month
    const startDateThisMonth = new Date();
    startDateThisMonth.setDate(1);
    startDateThisMonth.setHours(0, 0, 0, 0);

    const endDateThisMonth = new Date();
    endDateThisMonth.setDate(1);
    endDateThisMonth.setMonth(endDateThisMonth.getMonth() + 1);
    endDateThisMonth.setHours(0, 0, 0, 0);

    // Get the count of comments created between start and end date of this month
    const thisMonthComments = await prisma.comment.count({
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

    // Get the count of comments created between start and end date of last month
    const lastMonthComments = await prisma.comment.count({
      where: {
        createdAt: {
          gte: startDateLastMonth,
          lt: endDateLastMonth,
        },
      },
    });

    // Calculate the percentage change in comments between this month and last month
    let percentageChange;
    if (lastMonthComments === 0) {
      if (thisMonthComments === 0) {
        percentageChange = 0; // Handle division by zero
      } else {
        percentageChange = 100; // All comments created this month are new
      }
    } else {
      percentageChange = (
        ((thisMonthComments - lastMonthComments) / lastMonthComments) *
        100
      ).toFixed(2);
    }

    // Prepare response object with total comments and percentage change only
    const responseData = {
      totalComments,
      percentageChange,
    };

    return new NextResponse(JSON.stringify(responseData));
  } catch (error) {
    return new NextResponse("API is not working", { status: 400 });
  }
}
