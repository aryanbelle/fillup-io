import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import CreatorForm from "@/app/models/CreatorForm"; // Import the hash and verify functions
import { encrypt } from "@/app/lib/crypto";

export async function GET() {
  try {
    await dbConnect();
    // const current_user = await currentUser();
    const current_user = 'user_2jpufxLkYhVKDyKb6ZPwBlDba06';
    // if(!currentUser){
    //     return NextResponse.json({success: false, message: 'Unauthorized user'});
    // }

    if (!current_user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 400 }
      );
    }

    let my_forms = await CreatorForm.find({
      creatorId: current_user,
    });

      const forms = my_forms.map((form) => {
        return {
          id: encrypt(form._id.toString()),
          title: form.title,
          description: form.description,
          isAccepting: form.isAcceptingResponses,
        };
      })

    return NextResponse.json({ success: true, data: forms });
  } catch (error: any) {
    console.log(error);
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'EAI_AGAIN') {
      return NextResponse.json(
        { message: "Network error, please check your connection." },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: 500, message: "Something went wrong" });
  }
}
