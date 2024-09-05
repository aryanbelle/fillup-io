"use client";
import CreatorForm from "@/app/components/CreatorForm";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";

const Page = () => {
  const [form, setForm] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/aicreatorform", {
        reqprompt: prompt,
      });

      setIsLoading(false);
      if (response.data.success) {
        setForm({
          title: response.data.data.title || "Untitled Form",
          description: response.data.data.description || "Form description",
          questions: response.data.data.questions || [
            {
              type: "text",
              text: "Your question",
              options: [],
              isRequired: true,
            },
          ],
          isFile: false,
        });
      } else {
        console.error("Failed to fetch data:", response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center pt-5 min-h-screen min-w-[98vw] w-full bg-gradient-to-r from-slate-800 via-gray-900 to-black text-gray-200">
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          {!form && (
            <div className="flex space-x-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className="w-full max-w-md px-6 py-3 text-lg bg-gray-800 text-gray-200 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-700"
              />
              <Button
                isLoading={isLoading}
                onClick={fetchData}
                className="px-8 py-7 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg border border-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-800 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                Generate
              </Button>
            </div>
          )}
        </div>
        {form && (
          <div className="bg-gray-800 p-6 items-center flex flex-col rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-white">{form.title}</h2>
            <p className="text-gray-400">{form.description}</p>
            <CreatorForm
              title={form.title}
              description={form.description}
              questions={form.questions.map((que) => ({
                type: que.type,
                text: que.text,
                options: que.options ? [...que.options] : [],
                isRequired: que.isRequired,
              }))}
              isFile={form.isFile}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
