import dbConnect from "@/app/lib/dbConnect";
import CreatorForm from "@/app/models/CreatorForm";
import userFormResponse from "@/app/models/userFormResponse";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { formid: string } }
) {
  try {
    await dbConnect();
    const creatorId = await currentUser();
    if (creatorId === null) {
      return NextResponse.json({ message: "Unauthorized user" });
    }
    const form = await CreatorForm.findByIdAndDelete(params.formid);
    const responses = await userFormResponse.deleteMany({
      formId: params.formid,
    });
    return NextResponse.json({ success: true, message: "Form deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: 500, message: "Something went wrong" });
  }
}
