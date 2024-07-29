import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import CreatorForm from "../../models/form";
// import upload from '@/app/lib/multer';

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const form = await req.json();
    const { title, description, questions } = form;

    // Check for missing data
    if (!title || !description || !questions) {
      return NextResponse.json({ message: "Missing data" });
    }

    // Create a new form document
    const data = await CreatorForm.create(form);

    // Send success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
