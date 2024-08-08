import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import CreatorForm from "@/app/models/CreatorForm";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const form = await req.json();
    const { id } = await currentUser();
    const { isAcceptingResponses, title, description, questions } = form;
    if (id === null) {
      return NextResponse.json({ message: "Unauthorized user" });
    }
    if (!title || !description || !questions) {
      return NextResponse.json({ message: "Missing data" }, { status: 404 });
    }
    const data = await CreatorForm.create({
      isAcceptingResponses,
      creatorId: id,
      title,
      description,
      questions,
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
