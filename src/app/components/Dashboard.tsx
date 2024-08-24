import axios from "axios";
import React from "react";
import Templates from "@/app/components/Templates";
import FormCard from "./FormCard";

const Dashboard = async () => {
  let forms = [];
  try {
    const response = await axios.get("/api/myforms");
    if (response.data.success) {
      forms = response.data.data;
    }
  } catch (error) {}

  return (
    <div className="mainclass flex flex-col w-full p-3 px-12 gap-3 min-h-screen bg-gradient-to-r from-blue-50 to-gray-100  ">
      <h2 className="text-4xl mb-2 capitalize w-full text-start text-start text-gray-800 font-semibold mt-2 ">
        Templates
      </h2>
      <Templates />
      <h2
        id="recents"
        className="text-4xl py-4 capitalize w-full text-start text-start text-gray-800 font-semibold mt-2 "
      >
        Recents
      </h2>
      <FormCard forms={forms} />
    </div>
  );
};

export default Dashboard;
