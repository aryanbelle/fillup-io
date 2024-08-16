"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { id: String } }) => {
  const searchParams = useSearchParams();

  const [formResponse, setFormResponse] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  useEffect(() => {
    async function fetchData() {
      // setFormResponse(await axios.get(`/api/getresponse/${params.id}`));
      const response = await axios.get(`/api/getresponses/${params.id}`, {
        data: pageNo,
      });
      console.log(response, "respoooooonse");
      if (response.data?.data) {
        setFormResponse(response.data.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-inherit flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-2">{formResponse[0]?.title}</h2>
      <p className="mb-4">{formResponse[0]?.description}</p>
      {formResponse.map((form) => (
        <div
          key={form._id}
          className="p-4 mb-6 self-center min-w-64 bg-white shadow-lg rounded-md"
        >
          <div>
            {form.questions.map((question, index) => (
              <div key={question._id} className="mb-4">
                <p className="font-semibold">
                  {index + 1}. {question.question}
                </p>
                <input
                  disabled={true}
                  className="italic w-full w-fit text-gray-700"
                  value={
                    question.answer_type === "checkbox"
                      ? question.answer.split(",").join(", ")
                      : question.answer
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
