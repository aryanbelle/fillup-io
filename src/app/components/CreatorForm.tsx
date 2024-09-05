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
    title: props.title,
    description: props.description,
    questions: [...props.questions],
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
        router.push(`/#recents`);
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
    <div className="mainclass p-6 flex flex-col min-w-[390px] justify-center border border-gray-300 max-w-[740px] md:w-full text-gray-800 bg-white mt-10 shadow-md">
      <form action="" onSubmit={(event) => handleSendData(event)}>
        <div className="rounded-lg">
          <div className="p-4 mb-4 rounded-md">
            <div className="mb-5">
              <label className="block text-lg font-semibold mb-2">
                Title of form
              </label>
              <Input
                radius="none"
                type="text"
                className="w-full border border-gray-300"
                value={form.title}
                size="lg"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="mb-5">
              <label className="block text-lg font-semibold mb-2">
                Description of form
              </label>
              <Textarea
                radius="none"
                minRows={3}
                className="w-full border border-gray-300"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="p-4 text-sm mb-4">
            {form.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="mb-6 p-4 border border-gray-300 rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-base font-semibold">
                    Question
                  </label>
                  <Button
                    color="danger"
                    variant="light"
                    size="sm"
                    onClick={() => deleteQuestion(qIndex)}
                  >
                    Delete
                  </Button>
                </div>
                <Input
                  radius="none"
                  type="text"
                  className="w-full border border-gray-300 text-sm mb-4"
                  value={question.text}
                  size="md"
                  onChange={(e) => handleInputChange(qIndex, e)}
                />
                <div className="flex justify-end items-center mb-3">
                  <div className="flex items-center gap-4">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="capitalize"
                          size="sm"
                        >
                          {question.type}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Question Type"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        onSelectionChange={(event) =>
                          handleTypeChange(qIndex, event.anchorKey?.toString())
                        }
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
                        {!form.isFile && (
                          <DropdownItem key="file" value="file">
                            File
                          </DropdownItem>
                        )}
                        <DropdownItem key="radio" value="radio">
                          Radio
                        </DropdownItem>
                        <DropdownItem key="checkbox" value="checkbox">
                          Checkbox
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
                      Required
                    </Switch>
                  </div>
                </div>
                {(question.type === "radio" ||
                  question.type === "checkbox") && (
                  <div className="flex flex-col">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className="flex items-center gap-3 mb-2"
                      >
                        <label className="block text-sm">{oIndex + 1}</label>
                        <Input
                          size="sm"
                          radius="none"
                          type="text"
                          className="border border-gray-300 w-full"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e)
                          }
                        />
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
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
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      color="primary"
                      variant="bordered"
                      size="sm"
                      onClick={() => addOption(qIndex)}
                    >
                      Add Option
                    </Button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <Button
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
        {form.questions.length > 0 && (
          <Button
            isLoading={loading}
            type="submit"
            className="w-full py-2"
            size="lg"
            color="primary"
          >
            Create Form
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreatorForm;
