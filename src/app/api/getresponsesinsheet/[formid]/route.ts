import dbConnect from "@/app/lib/dbConnect";
import UserFormResponse from "@/app/models/userFormResponse";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from 'xlsx';
import cloudinary from "cloudinary";
import { Readable } from "stream";
import { decrypt } from "@/app/lib/crypto";
import CreatorForm from "@/app/models/CreatorForm"; // Import CreatorForm to validate form existence

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function streamUpload(buffer: Buffer, fileName: string): Promise<cloudinary.UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            {
                folder: "fillup-files",
                resource_type: 'raw', // Use 'raw' for all types of files
                public_id: fileName, // Use the file name with extension
                use_filename: true, // Use the original filename
                unique_filename: false, // Prevent Cloudinary from changing the filename
            },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        Readable.from(buffer).pipe(uploadStream);
    });
}

export async function POST(request: NextRequest, { params }: { params: { formid: string } }): Promise<NextResponse> {
    try {
        await dbConnect();
        const decryptedFormId = decrypt(params.formid);

        // Check if the form exists
        const formExists = await CreatorForm.findById(decryptedFormId);
        if (!formExists) {
            return NextResponse.json({ success: false, message: "Form not found" }, { status: 404 });
        }

        const getData = await UserFormResponse.find({ formId: decryptedFormId });

        // Transform data as required
        const data = getData.map((response) => {
            return {
                userId: response.userId, 
                questions: response.questions.map((field) => ({
                    question: field.question, 
                    answer: field.answer 
                })),
            };
        });

        // Convert JSON data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Write the workbook to a buffer
        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Generate a unique file name with a timestamp
        const fileName = `response_${Date.now()}.xlsx`;

        // Upload to Cloudinary
        const uploadResult = await streamUpload(buffer, fileName);

        if (!uploadResult) {
            return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
        }

        // Send the Cloudinary URL as a response
        return NextResponse.json({ success: true, url: uploadResult.secure_url, data });
    } catch (error: any) {
        console.error("Error during POST request:", error);

        // Check for network-related errors
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'EAI_AGAIN') {
            return NextResponse.json(
                { message: "Network error, please check your connection." },
                { status: 503 }
            );
        }

        // Handle any other errors
        return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}
