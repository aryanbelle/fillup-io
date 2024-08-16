"use client";
import { Button, Switch } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState([]);

  async function fetchForms() {
    try {
      setIsLoading(true);
      const response = await axios.get("api/myforms");
      if (response.status === 200) {
        setForms(response.data.data);
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
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="mainclass  flex flex-col gap-4 m-4 p-4  max-w-3xl  self-center w-full  ">
      {forms.map((form) => (
        <div onClick={() => handleFormClick(form.id)}>
          <Card
            key={form.id}
            className="cursor-pointer hover:shadow-xl transition-shadow duration-200"
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
            <CardBody className="bg-gray-50 rounded-b-lg">
              <p className="text-sm text-gray-600">{form.description}</p>
            </CardBody>
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
