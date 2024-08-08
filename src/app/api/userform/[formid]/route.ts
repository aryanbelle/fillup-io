import {NextRequest, NextResponse} from "next/server";
import CreatorForm from "@/app/models/CreatorForm";
import dbConnect from "@/app/lib/dbConnect";

export async function GET(request: Request, {params}: {params: {formid: string}}){
    try{
        await dbConnect();
        const getData = await CreatorForm.findById(params.formid);

        if(!(getData.isAcceptingResponses)){
            return NextResponse.json({success: false, message: 'No more recieving responses'})
        }
        return NextResponse.json({data: getData});
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}