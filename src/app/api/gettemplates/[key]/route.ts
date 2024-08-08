import { NextRequest, NextResponse } from "next/server";
import Templates from './templates.json';

export async function GET(req: NextRequest, { params }: { params: { key: string } }) {
    try {
        const form = Templates.find(template => template["key"] === params.key);
        return NextResponse.json({ success: true, data: form});
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}