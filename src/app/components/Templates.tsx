import React from "react";
import MyCard from "./Card";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
const Templates = () => {
  return (
    <div className="m-3 w-full flex justify-center gap-6 flex-wrap">
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

      <div className="p-3 m-3 rounded-md cursor-pointer transition-transform transform hover:scale-105 duration-300 bg-white ">
        <Card
          isBlurred={true}
          className=" shadow-none  rounded-none  w-full max-w-xs"
        >
          <div onClick={() => {}}>
            <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start h-15">
              <h4 className="font-bold text-base text-left">Blank Form</h4>
              <small className="text-xs text-gray-700 mt-1">
                Start creating from scratch
              </small>
            </CardHeader>
            <CardBody className="overflow-hidden flex w-full justify-center items-center p-8">
              <Image
                alt="Card background"
                className="object-cover rounded-lg"
                src="/blank-icon.png"
                height={190} // Standard height for all images
              />
            </CardBody>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Templates;
