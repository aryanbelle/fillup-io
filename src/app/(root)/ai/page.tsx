"use client";
import CreatorForm from "@/app/components/CreatorForm";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [form, setForm] = useState(null);
  const [prompt, setPrompt] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/aicreatorform", {
        reqprompt: prompt,
      });

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
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center pt-5 min-h-screen min-w-[90vw] w-full bg-gray-100">
      <div className="space-y-6 text-center">
        <div className="flex space-x-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            className="w-full max-w-md px-6 py-3 text-lg bg-white text-gray-600 rounded-lg border border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          />
          <button
            onClick={fetchData}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg border border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-700 focus:border-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Generate
          </button>
        </div>
        {form && (
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
        )}
      </div>
    </div>
  );
};

export default Page;
