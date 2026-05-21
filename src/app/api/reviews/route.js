import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const reviews = await Testimonial.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({ success: true, data: reviews });
  } catch (err) {
    console.error("GET /api/reviews:", err);
    return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, city, rating, review } = await req.json();

    if (!name || !rating || !review) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await connectDB();
    await Testimonial.create({ name, city, rating, review });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/reviews:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}