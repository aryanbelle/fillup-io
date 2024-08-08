import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import UserFormResponse from "@/app/models/userFormResponse";

export async function GET(req: NextRequest, { params }: { params: { responseid: string } }){
    try{
        await dbConnect();
        const getResponse = await UserFormResponse.findById(params.responseid);
        return NextResponse.json({success: true, data: getResponse});
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}