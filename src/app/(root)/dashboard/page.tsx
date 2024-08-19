"use client";
import { Button, CardFooter, Snippet, Switch } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CustomSnippet from "@/app/components/CustomSnippet";
import Templates from "@/app/components/Templates";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [forms, setForms] = useState([]);

  async function fetchForms() {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/myforms");
      console.log(response, "RESPONSE////////");
      if (response.data.success) {
        setForms(response.data.data);
      } else {
        toast.error(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Request Failed");
    }
  }

  function handleFormClick(id: String) {
    router.push(`myforms/form/${id}`);
  }

  async function handleSwitchChage(value, formId: String) {
    toast.success("Requesting...");
    try {
      const response = await axios.put(`/api/updateformaccept/${formId}`, {
        isAcceptingResponses: value,
      });
      if (response.data.success) {
        toast.success("Updated Successfully!");
        router.refresh();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="mainclass  flex flex-col justify-center items-center gap-4  min-h-svh   bg-[#e6ebed] w-full  ">
      <Templates />
      {forms &&
        forms.map((form) => (
          <div onClick={() => handleFormClick(form.id)}>
            <Card
              key={form.id}
              className="cursor-pointer max-w-3xl  shadow-none "
            >
              <CardHeader className="bg-white rounded-t-lg">
                <div className="flex w-full justify-between p-2">
                  <div className="text-lg font-semibold">{form.title}</div>
                  <div>
                    <Switch
                      defaultSelected={form.isAccepting}
                      onChange={(eve) =>
                        handleSwitchChage(!form.isAccepting, form.id)
                      }
                      size="sm"
                    >
                      Accepting
                    </Switch>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="bg-gray-50 flex  justify-between rounded-b-lg">
                <div className="flex justify-between w-full">
                  <span className="text-sm text-gray-600">
                    {form.description}
                  </span>
                  <span className="text-sm text-gray-600">
                    {form.createdAt}
                  </span>
                </div>
              </CardBody>
              <CardFooter>
                <CustomSnippet
                  url={`${process.env.NEXT_PUBLIC_API_URL}/form/${form.id}`}
                />
              </CardFooter>
            </Card>
          </div>
        ))}
      <Button
        className="mt-4 self-center"
        variant="shadow"
        color="primary"
        isLoading={isLoading}
        onClick={fetchForms}
      >
        Load More
      </Button>
    </div>
  );
};

export default page;
