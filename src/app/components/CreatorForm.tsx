"use client";
import {
  Switch,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import "./form.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreatorForm = (props: {
  title: "Untitled Form";
  description: "Form description";
  questions: [
    {
      type: "text";
      text: "Your question";
      options: [];
      isRequired: true;
    }
  ];
  isFile: false;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "Untitled Form",
    description: "Form description",
    questions: [
      {
        type: "text",
        text: "Your question",
        options: [],
        isRequired: true,
      },
    ],
    isFile: false,
  });
  console.log(props, "Params.....///////");
  const handleSendData = async (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      console.log("Sending...");
      const response = await axios.post("/api/creatorform", form);
      console.log(response, "RESPONSE FORM BACKEND");
      if (response.data?.success) {
        toast.success("Form created!");
        router.push(`./dashboard`);
      } else {
        toast.error("Request failed, try again");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "ERRORORORORO");
    }
  };

  useEffect(() => {
    if (props.props) {
      setForm({ ...props.props });
    }
  }, []);

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { type: "text", text: "New Question", options: [], isRequired: true },
      ],
    });
  };

  const handleSwitchChange = (index, _bool) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === index) {
        return { ...question, isRequired: !_bool };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const handleInputChange = (index: Number, event) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === index) {
        return { ...question, text: event.target.value };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const handleTypeChange = (index, event) => {
    if (event !== "file") {
      const newQuestions = form.questions.map((question, i) => {
        if (i === index) {
          return { ...question, type: event, options: [] };
        }
        return question;
      });
      setForm({ ...form, questions: newQuestions });
    } else {
      if (form.isFile) {
        toast.error("Multiple file upload are not allowed!");
      } else {
        const newQuestions = form.questions.map((question, i) => {
          if (i === index) {
            return { ...question, type: event, options: [] };
          }
          return question;
        });
        setForm({ ...form, questions: newQuestions, isFile: true });
      }
    }
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === qIndex) {
        const newOptions = question.options.map((option, j) => {
          if (j === oIndex) {
            return event.target.value;
          }
          return option;
        });
        return { ...question, options: newOptions };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const addOption = (qIndex) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === qIndex) {
        return {
          ...question,
          options: [...question.options, "New Option"],
        };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const deleteQuestion = (index) => {
    if (form.questions[index].type === "file") {
      setForm({
        ...form,
        questions: form.questions.filter((_, i) => i !== index),
        isFile: false,
      });
    } else {
      setForm({
        ...form,
        questions: form.questions.filter((_, i) => {
          return i !== index;
        }),
      });
    }
  };

  return (
    <div className="mainclass flex flex-col min-w-[390px] justify-center rounded-md max-w-[740px]  md:w-full text-gray-900 p-2 bg-white ">
      <form action="" onSubmit={(event) => handleSendData(event)}>
        <div className=" rounded-lg">
          <div className="  p-1 mb-2 rounded-md">
            <div className="mb-5 ">
              <label className="block mb-1.5">Title of form</label>
              <Input
                type="text"
                className="w-full max-w-4xl "
                value={form.title}
                size="lg"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1.5">Description of form</label>

              <Textarea
                minRows={2}
                className="max-w-4xl w-full"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="p-1 text-xs mb-2">
            {form.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="lg:mb-2.5  p-2 border-1 border-gray-200 rounded-md "
              >
                <div className="flex justify-between items-center ">
                  <label className="block">Question</label>
                  <Button
                    className="bg-white"
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={() => deleteQuestion(qIndex)}
                  >
                    delete
                  </Button>
                </div>
                <Input
                  type="text"
                  className="w-full text-small mb-4"
                  value={question.text}
                  size="sm"
                  onChange={(e) => handleInputChange(qIndex, e)}
                />

                <div className="flex justify-end items-center h-5 m-1.5 ">
                  <div className="flex justify-between items-center  sm:h-3 scale-[90%] lg:gap-4 sm: gap-2">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize "
                          size="sm"
                        >
                          {question.type}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        onSelectionChange={(event) =>
                          handleTypeChange(qIndex, event.anchorKey?.toString())
                        }
                        // onChange={(event) => handleTypeChange(qIndex, event)}
                      >
                        <DropdownItem key="text" value="text">
                          Text
                        </DropdownItem>
                        <DropdownItem key="number" value="number">
                          Number
                        </DropdownItem>
                        <DropdownItem key="date" value="date">
                          Date
                        </DropdownItem>
                        <DropdownItem key="time" value="time">
                          Time
                        </DropdownItem>
                        {!form.isFile ? (
                          <DropdownItem key="file" value="file">
                            File
                          </DropdownItem>
                        ) : (
                          ""
                        )}
                        <DropdownItem key="radio" value="radio">
                          Radio
                        </DropdownItem>
                        <DropdownItem key="checkbox" value="checkbox">
                          checkbox
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Switch
                      defaultSelected
                      isSelected={question.isRequired}
                      onChange={(event) =>
                        handleSwitchChange(qIndex, question.isRequired)
                      }
                      size="sm"
                    >
                      required
                    </Switch>
                  </div>
                </div>
                {(question.type === "radio" ||
                  question.type === "checkbox") && (
                  <>
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className="flex gap-2 scale-[95%] ml-[-8px]"
                      >
                        <label
                          htmlFor=""
                          className="items-center justify-center pt-1.5 text-medium"
                        >
                          {oIndex + 1}
                        </label>
                        <Input
                          size="sm"
                          isRequired={true}
                          type="text"
                          className="mt-1 max-w-48"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e)
                          }
                        />
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          className="text-xs text-red-500"
                          onClick={() => {
                            const newOptions = question.options.filter(
                              (_, j) => j !== oIndex
                            );
                            const newQuestions = form.questions.map((q, i) => {
                              if (i === qIndex) {
                                return { ...q, options: newOptions };
                              }
                              return q;
                            });
                            setForm({ ...form, questions: newQuestions });
                          }}
                        >
                          remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="mt-2"
                      color="primary"
                      variant="bordered"
                      size="sm"
                      onClick={() => addOption(qIndex)}
                    >
                      Add Option
                    </Button>
                  </>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                className="m-2"
                size="sm"
                color="primary"
                variant="flat"
                onClick={addQuestion}
              >
                Add Question
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full  p-1"
          size="md"
          color="primary"
          variant="shadow"
          // isLoading={true}
        >
          Create Form
        </Button>
      </form>
    </div>
  );
};

export default CreatorForm;
