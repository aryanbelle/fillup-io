import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import UserFormResponse from "@/app/models/userFormResponse";
import CreatorForm from "@/app/models/CreatorForm";

export async function POST(
  req: NextRequest,
  { params }: { params: { formid: string } }
) {
  function isSubset(arr1: string[], arr2: string[]) {
    return arr2.every((element) => arr1.includes(element));
  }

  try {
    await dbConnect();
    const form = await req.json();
    const formId = params.formid;

    let userId = await currentUser();
    userId = userId?.id;
    if (userId === null) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const { title, description, questions } = form;

    const creatorForm = await CreatorForm.findById(formId);
    if (
      creatorForm.title !== title ||
      creatorForm.description !== description
    ) {
      return NextResponse.json({
        success: false,
        message: "Incorrect title or description",
      });
    }

    if (!title || !description || !questions) {
      return NextResponse.json({
        success: false,
        message: "Fill all the required fields",
      });
    }

    if (questions.length > creatorForm.questions.length) {
      console.log(questions.length, creatorForm.queestions);
      return NextResponse.json({
        success: false,
        message: "Invalid number of questions attempted",
      });
    }

    for (let i = 0; i < creatorForm.questions.length; i++) {
      if (creatorForm.questions[i].isRequired) {
        if (questions[i].question === "" || questions[i].answer === "") {
          return NextResponse.json({
            success: false,
            message: "Fill all fucking required fields!!!",
          });
        }
        if (questions[i].question !== creatorForm.questions[i].text) {
          return NextResponse.json({
            success: false,
            message: "Invalid data access",
          });
        }
        if (questions[i].answer_type !== creatorForm.questions[i].type) {
          return NextResponse.json({ success: false, message: "Invalid type" });
        }
        if (questions[i].answer_type === "checkbox") {
          let result = isSubset(
            creatorForm.questions[i].options,
            questions[i].answer
          );
          questions[i].answer = questions[i].answer.join(",");
          console.log(result);
          if (!result) {
            return NextResponse.json({
              success: false,
              message: "Invalid answer options",
            });
          }
        }
        if (questions[i].answer_type === "radio") {
          if (questions[i].answer.length > 1) {
            return NextResponse.json({
              success: false,
              message: "Mutliple options given in radio",
            });
          }
          let result = isSubset(
            creatorForm.questions[i].options,
            questions[i].answer
          );
          questions[i].answer = questions[i].answer.join(",");
          if (!result) {
            return NextResponse.json({
              success: false,
              message: "Not matching option",
            });
          }
        }
      }
    }

    const data = await UserFormResponse.create({
      userId,
      formId,
      title,
      description,
      questions,
    });
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.log("ERROR: " + error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
