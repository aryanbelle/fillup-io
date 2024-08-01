import {NextRequest, NextResponse} from "next/server";
import CreatorForm from "@/app/models/CreatorForm";
import dbConnect from "@/app/lib/dbConnect";

export async function GET(request: Request, {params}: {params: {formid: string}}){
    try{
        await dbConnect();
        const getData = await CreatorForm.findById(params.formid);
        return NextResponse.json({data: getData});
    }catch(error){
        console.log(error);
    }
}