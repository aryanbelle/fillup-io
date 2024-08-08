"use client";
import { Button, Switch } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState([]);

  async function fetchForms() {
    try {
      setIsLoading(true);
      const response = await axios.get("api/myforms");
      console.log(response);
      if (response.status === 200) {
        setForms(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      alert("Request Failed");
    }
  }

  function handleFormClick(id: String) {
    router.push(`myforms/form/${id}`);
  }
  useEffect(() => {
    fetchForms();
  }, []);
  return (
    <div className="mainclass flex flex-col gap-3 m-3 self-center max-w-2xl justify-center  ">
      {forms.map((form) => {
        return (
          <Card className="cursor-pointer">
            <CardHeader>
              <div className="flex w-full justify-between p-2">
                <div>{form.title}</div>
                <div>
                  <Switch defaultSelected={form.isAccepting}>Accepting</Switch>
                </div>
              </div>{" "}
            </CardHeader>
            <CardBody>
              <p>{form.description}</p>
              <Button onClick={() => handleFormClick(form.id)}>Open</Button>
            </CardBody>
          </Card>
        );
      })}
      <Button
        className=""
        variant="flat"
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
