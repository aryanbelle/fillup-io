import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/app/lib/dbConnect";
import CreatorForm from "@/app/models/CreatorForm";

export async function GET() {
  try {
    await dbConnect();
    const current_user = await currentUser();
    // if(!currentUser){
    //     return NextResponse.json({success: false, message: 'Unauhtorized user'});
    // }
    let my_forms;
    if (current_user.id) {
      my_forms = await CreatorForm.find({
        creatorId: current_user.id!,
      });
      console.log(my_forms);
    } else
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );

    console.log(my_forms instanceof Object, current_user.id);

    const forms = my_forms.map((form) => {
      return {
        id: form._id,
        title: form.title,
        description: form.description,
        isAccepting: form.isAcceptingResponses,
      };
    });
    return NextResponse.json({ success: true, data: forms });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
