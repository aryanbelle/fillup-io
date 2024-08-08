import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import UserFormResponse from "@/app/models/userFormResponse";
import CreatorForm from "@/app/models/CreatorForm";

export async function PUT(req: NextRequest, { params }: { params: { formid: string } }){
    try{
        await dbConnect();
        const data = await req.json();

        if(typeof data.isAcceptingResponses !== "boolean"){
            return NextResponse.json({success: false, message: 'Invalid datatype'})
        }

        const getResponse = await CreatorForm.findByIdAndUpdate(
            params.formid,
            data,
            {new: true}
        );
        return NextResponse.json({success: true, data: getResponse});
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}