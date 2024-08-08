import dbConnect from "@/app/lib/dbConnect";
import UserFormResponse from "@/app/models/userFormResponse";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { formid: string } }
) {
  try {
    await dbConnect();

    let { pageNo } = (await request.json()) || 0;
    pageNo = parseInt(pageNo || "0");

    const creatorId = await currentUser();
    if (creatorId === null) {
      return NextResponse.json({ message: "Unauthorized user" });
    }

    const getData = await UserFormResponse.find({ formId: params.formid })
      .skip(start)
      .limit(10);
    return NextResponse.json({ data: getData });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
