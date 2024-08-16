"use client";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = ({ params }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/userform/${params.id}`);
        console.log(response, "fetching");
        if (response.data.data) {
          const _formData = response.data.data;
          setFormData({
            title: _formData.title,
            description: _formData.description,
            questions: _formData.questions.map((ques) => ({
              ...ques,
              answer: ques.type === "checkbox" || "radio" ? [] : "",
            })),
          });
          setIsLoading(false);
        } else {
          alert("Request failed, try refreshing page!");
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchData();
  }, [params.id]);

  const handleInputChange = (index, value, isCheckbox, option) => {
    const newQuestions = [...formData.questions];
    if (isCheckbox) {
      const currentAnswers = newQuestions[index].answer || [];
      if (currentAnswers.includes(option)) {
        newQuestions[index].answer = currentAnswers.filter(
          (item) => item !== option
        );
      } else {
        newQuestions[index].answer = [...currentAnswers, option];
      }
    } else if (newQuestions[index].type === "file") {
      newQuestions[index].answer = value[0]; // Handle file upload
    } else {
      if (newQuestions[index].type === "radio") {
        newQuestions[index].answer[0] = value;
      } else {
        newQuestions[index].answer = value;
      }
    }

    const updatedFormData = { ...formData, questions: newQuestions };
    setFormData(updatedFormData);
  };

  const uploadFormResponse = async (_data) => {
    try {
      console.log(_data);
      const serverFormData = {
        title: _data?.title,
        description: _data?.description,
        questions: _data?.questions.map((question) => ({
          question: question.text,
          answer: question.answer,
          answer_type: question.type,
        })),
      };
      const response = await axios.post(
        `/api/submituserform/${params.id}`,
        serverFormData
      );
      console.log(response, "UPLOAD RESPONSE....");
      return response;
    } catch (error) {
      console.log(error, "ERRRRRRROR");
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedQuestions = await Promise.all(
        formData.questions.map(async (que) => {
          if (que?.type === "file") {
            const _formData = new FormData();
            _formData.append("file", que.answer);
            const response = await axios.post("/api/getfile", _formData);
            console.log(response, "RESPONSE FROM HANDLESUBMIT");
            if (response.data?.url) {
              return { ...que, answer: response.data.url }; // Update answer with the file URL
            } else {
              toast.error("File upload failed! Please try again.");
              throw new Error("File upload failed");
            }
          }
          return que;
        })
      );

      return { ...formData, questions: updatedQuestions };
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
      console.error("Error submitting form:", error);
      throw error; // Re-throw the error so it can be caught in mainHandleSubmit
    }
  };

  async function mainHandleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const _data = await handleSubmit(); // Wait for handleSubmit to complete
      const response = await uploadFormResponse(_data); // Pass the updated data to uploadFormResponse
      console.log(response, "RESPONSE..............");
      if (response?.data?.success) {
        toast.success("Form created successfully!");
        router.push("./");
      } else {
        toast.error("Form submission failed, please try again!");
      }
    } catch (error) {
      console.log(error, "ERROR IN MAIN HANDLESUBMIT");
      toast.error("Something went wrong during submission!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl flex flex-col justify-center mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{formData.title}</h1>
      <p className="mb-4">{formData.description}</p>
      <form onSubmit={(event) => mainHandleSubmit(event)}>
        {formData.questions.map((question, index) => (
          <div key={question._id} className="mb-4">
            <label className="block mb-2 text-lg font-semibold">
              {question.text}{" "}
              {question.isRequired && <span className="text-red-500">*</span>}
            </label>
            {question.type === "text" && (
              <Input
                type="text"
                required={question.isRequired}
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, false)
                }
                className="w-full p-2  rounded"
              />
            )}
            {question.type === "number" && (
              <Input
                type="number"
                required={question.isRequired}
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, false)
                }
                className="w-full p-2  rounded"
              />
            )}
            {question.type === "date" && (
              <Input
                type="date"
                required={question.isRequired}
                value={question.answer}
                onChange={(e) =>
                  handleInputChange(index, e.target.value, false)
                }
                className="w-full p-2  rounded"
              />
            )}
            {question.type === "file" && (
              <Input
                type="file"
                required={question.isRequired}
                onChange={(e) =>
                  handleInputChange(index, e.target.files, false)
                }
                className="w-full p-2  rounded"
              />
            )}
            {question.type === "radio" && (
              <div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <Input
                        type="radio"
                        name={`question_${index}`}
                        value={option}
                        checked={question.answer[0] === option}
                        required={question.isRequired}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value, false)
                        }
                        className="form-radio"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
            {question.type === "checkbox" && (
              <div>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={`question_${index}`}
                        value={option}
                        checked={question.answer.includes(option)}
                        onChange={() =>
                          handleInputChange(index, null, true, option)
                        }
                        className="form-checkbox"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button
          type="submit"
          variant="shadow"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded"
          isLoading={isLoading}
        >
          {isLoading ? "Hang tight" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
