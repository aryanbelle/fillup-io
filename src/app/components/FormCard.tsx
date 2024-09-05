"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Switch,
} from "@nextui-org/react";
import CustomSnippet from "./CustomSnippet";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import NoDataPlaceholder from "./NoDataplaceholder";
import { useEffect, useState } from "react";
const FormCard = () => {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  function handleFormClick(id: String) {
    router.push(`myforms/form/${id}`);
  }

  async function handleSwitchChange(value: boolean, formId: string) {
    try {
      //   Use toast.promise to manage the promise lifecycle with automatic toast notifications
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
    async function fetchForms() {
      const response = await axios.get("/api/myforms");
      console.log(response, "RESPONSE ----------");
      if (response.data.success) {
        setForms([...response.data.data]);
      }
    }
    fetchForms();
  }, []);
  return (
    <div className="flex flex-wrap gap-3">
      {forms.length ? (
        forms
          .slice() // Create a shallow copy of the array to avoid mutating the original array
          .reverse() // Reverse the array
          .map((form) => (
            <div
              key={form.id}
              className="w-full border-1 border-gray-200 max-w-md mb-3 cursor-pointer"
            >
              <Card
                className=" flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300"
                radius="none"
              >
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
                      <span className="text-sm text-gray-600 overflow-hidden">
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
        <NoDataPlaceholder DATA={"Forms"} />
      )}
    </div>
  );
};

export default FormCard;
