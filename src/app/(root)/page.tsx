import { Button } from "@nextui-org/react";
import Link from "next/link";
import MyCard from "../components/Card";

export default async function Home() {
  return (
    <div className="min-h-[90vh] my-4 flex flex-col items-center justify-evenly gap-8 bg-[#e6ebed]">
      <div className="max-w-4xl text-center p-8 bg-white shadow-2xl rounded-3xl transition-transform transform hover:shadow-lg duration-300">
        <h1 className="text-6xl font-bold text-gray-800 mb-6">
          <div className="text-blue-600">FILLUP</div>
          <p className="inline-block font-bold text-blue-600 italic">.io</p>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Create, share, and analyze surveys effortlessly. Perfect for
          collecting feedback, conducting research, or organizing events.
        </p>
        <Button className="px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-200">
          <Link href="./newform">Get Started</Link>
        </Button>
      </div>
      <div className="w-full flex justify-center gap-6 flex-wrap">
        <MyCard
          server_key={"customerfeedback"}
          text="Customer Feedback"
          img={`/Customer Feedback.jpg`}
          description="Get insights from customers."
        />
        <MyCard
          server_key={"jobapplication"}
          text="Job Application"
          img={`/Job Application.jpg`}
          description="Streamline the hiring process with a customized application form."
        />
        <MyCard
          server_key={"eventregistration"}
          text="Event Registration"
          img={`/Event Registration.jpg`}
          description="Simplify event sign-ups and manage attendee information."
        />
        <MyCard
          server_key={"productsurvey"}
          text="Product Survey"
          img={`/Product Survey.jpg`}
          description="Collect valuable feedback on your products to enhance offerings."
        />
        <MyCard
          server_key={"workingfeedback"}
          text="Working Feedback"
          img={`/Working Feedback.jpg`}
          description="Monitor and improve workplace satisfaction with direct feedback."
        />
      </div>
    </div>
  );
}
