import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);
    const searchName = queryParams.get("search") || "";
    // Calculate the start and end date of this month
    const startDateThisMonth = new Date();
    startDateThisMonth.setDate(1);
    startDateThisMonth.setHours(0, 0, 0, 0);

    const endDateThisMonth = new Date();
    endDateThisMonth.setDate(1);
    endDateThisMonth.setMonth(endDateThisMonth.getMonth() + 1);
    endDateThisMonth.setHours(0, 0, 0, 0);

    // Get the total user count

    const totalUser = await prisma.user.count();

    // Get the count of users created between start and end date of this month
    const thisMonthUser = await prisma.user.count({
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

    // Get the count of users created between start and end date of last month
    const lastMonthUser = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDateLastMonth,
          lt: endDateLastMonth,
        },
      },
    });

    // Calculate the percentage change in users between this month and last month
    let percentage;
    if (lastMonthUser === 0) {
      if (thisMonthUser === 0) {
        percentage = 0; // Handle division by zero
      } else {
        percentage = 100; // All users created this month are new
      }
    } else {
      percentage = (
        ((thisMonthUser - lastMonthUser) / lastMonthUser) *
        100
      ).toFixed(2);
    }

    // Prepare response object with total users and percentage only
    const responseData = {
      totalUser,
      percentage,
    };

    return new NextResponse(JSON.stringify(responseData));
  } catch (error) {
    return new NextResponse("API is not working", { status: 400 });
  }
}
