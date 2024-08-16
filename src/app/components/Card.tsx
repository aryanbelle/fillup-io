"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

type Props = {
  text: string;
  img: string;
  description: string;
  server_key: string;
};

export default function MyCard(props: Props) {
  const router = useRouter();
  function handleDefaultForm(serverKey: string) {
    console.log("Rendering...");
    router.push(`./newform/${serverKey}`);
  }

  return (
    <Card className="p-3 cursor-pointer transition-transform transform hover:scale-105 duration-300 shadow-lg rounded-lg w-full max-w-xs">
      <div onClick={() => handleDefaultForm(props.server_key)}>
        <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-start h-15">
          <h4 className="font-bold text-base text-left">{props.text}</h4>
          <small className="text-xs text-gray-700 mt-1">
            {props.description}
          </small>
        </CardHeader>
        <CardBody className="overflow-hidden py-2">
          <Image
            alt="Card background"
            className="object-cover self-center w-full rounded-lg"
            src={props.img}
            width={270}
            height={150} // Standard height for all images
          />
        </CardBody>
      </div>
    </Card>
  );
}
