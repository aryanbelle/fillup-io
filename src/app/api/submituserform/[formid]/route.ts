import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import UserFormResponse from "@/app/models/userFormResponse";

export async function POST(req: NextRequest, { params }: { params: { formid: string } }) {
    await dbConnect();
    // const userId = 1;
    try {
        const form = await req.json();
        const formId = params.formid;

        const userId = form.userId;
        const userName = (await clerkClient.users.getUser(userId)).username;

        // console.log(userName)

        const { title, description, questions } = form;
        const data = await UserFormResponse.create({ userName, formId, title, description, questions });
        return NextResponse.json({ success: true, data: data }, { status: 200 })
    }catch(error){
        console.log('ERROR: '+error);    
    }
}