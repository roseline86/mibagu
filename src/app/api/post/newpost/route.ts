import sendSubscriberEmail from "@/components/helper/mail/SubscriberMail";
import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;
const prisma = new PrismaClient();

function formatPostLink(createdAt: Date, title: string, category: string) {
  // Adjust this formatting function based on your actual requirements
  const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const dateString = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(createdAt);

  return `${category}/${dateString}/${formattedTitle}`;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return new NextResponse("User not logged in", { status: 401 });
    }

    const data = await req.formData();

    const title = data.get("title") as string;
    const cover = data.get("image") as File;
    const categories = data.get("category") as string;
    const content = data.get("content") as string;

    if (!title || !cover || !categories || !content) {
      return new NextResponse("Missing title, file, categories, or content", {
        status: 400,
      });
    }

    const buffer = Buffer.from(await cover.arrayBuffer());
    const filename = Date.now() + cover.name.replaceAll(" ", "_");

    const storageRef = ref(storage, "post/featured/" + filename);
    await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(storageRef);

    const newPost = await prisma.post.create({
      data: {
        title,
        coverImage: downloadURL,
        category: categories,
        content,
        author: { connect: { id: token.sub } },
      },
    });

    // Fetch all subscribers
    const subscribers = await prisma.subscriber.findMany({
      select: { email: true },
    });

    // Format post link
    const postLink = formatPostLink(newPost.createdAt, title, categories);

    // Send notification emails to subscribers
    const postUrl = `https://mibagu.vercel.app/article/${postLink}`; // Construct the post URL
    const postExcerpt = content.slice(0, 100) + "..."; // Create a short excerpt

    await Promise.all(
      subscribers.map(async (subscriber) => {
        await sendSubscriberEmail(
          subscriber.email,
          "New Blog Post Published!", // Email subject
          title, // Post title
          postUrl, // Post URL
          postExcerpt, // Excerpt
          downloadURL, // Cover image URL
        );
      }),
    );

    return new NextResponse(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
