"use client";
import { Button, CardFooter, Snippet, Switch } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomSnippet from "@/app/components/CustomSnippet";
import Templates from "@/app/components/Templates";
import Loader from "@/app/components/Loader";

const Dashboard = () => {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchForms() {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/myforms");
      setIsLoading(false);
      console.log(response, "RESPONSE////////");
      if (response.data.success) {
        toast.success("Data recieved");
        console.log(
          response.data.data,
          "RESPONSE....................................."
        );
        setForms(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Request Failed");
    }
  }

  function handleFormClick(id: String) {
    router.push(`myforms/form/${id}`);
  }

  async function handleSwitchChange(value: boolean, formId: string) {
    try {
      // Use toast.promise to manage the promise lifecycle with automatic toast notifications
      const response = await toast.promise(
        axios.put(`/api/updateformaccept/${formId}`, {
          isAcceptingResponses: value,
        }),
        {
          loading: "Updating...",
          success: "Settings saved!",
          error: "Request failed!",
        }
      );
    } catch (error) {
      router.refresh();
      toast.error("Request failed.");
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

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
      <div className="flex flex-wrap justify-end flex-row-reverse gap-3 w-full">
        {!isLoading && forms ? (
          forms.map((form) => (
            <div key={form.id} className="w-full max-w-md mb-3 cursor-pointer">
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <div onClick={() => handleFormClick(form.id)}>
                  <CardHeader className="bg-white p-4">
                    <div className="flex justify-between w-full items-center">
                      <div className="text-xl  text-gray-700">{form.title}</div>
                      <Switch
                        defaultSelected={form.isAccepting}
                        onChange={(eve) =>
                          handleSwitchChange(!form.isAccepting, form.id)
                        }
                        size="sm"
                        className="transform hover:scale-110 transition-transform duration-300"
                      >
                        Accepting
                      </Switch>
                    </div>
                  </CardHeader>
                  <CardBody className="bg-gray-50 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {form.description}
                      </span>
                      <span className="text-sm text-gray-500 italic">
                        {new Date(form.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardBody>
                </div>
                <CardFooter className="bg-gray-100 p-4">
                  <CustomSnippet
                    url={`${process.env.NEXT_PUBLIC_API_URL}/form/${form.id}`}
                  />
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
