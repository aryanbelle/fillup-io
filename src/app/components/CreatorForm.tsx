"use clinet";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React, { useState } from "react";
import "./form.css";
import axios from "axios";

const CreatorForm = () => {
  const [form, setForm] = useState({
    title: "Untitled Form",
    description: "Form description",
    questions: [
      {
        type: "text",
        text: "Your question",
        options: [],
      },
    ],
  });

  const handleSendData = async (event) => {
    try {
      event.preventDefault();
      console.log("Sending...");
      const response = await axios.post("/api/newform", form);
      console.log(response, "RESPONSE FORM BACKEND");
    } catch (error) {
      console.log(error, "ERRORORORORO");
    }
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { type: "text", text: "New Question", options: [] },
      ],
    });
  };

  const handleInputChange = (index, event) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === index) {
        return { ...question, text: event.target.value };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const handleTypeChange = (index, event) => {
    const newQuestions = form.questions.map((question, i) => {
      if (i === index) {
        return { ...question, type: event, options: [] };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
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
        return { ...question, options: [...question.options, ""] };
      }
      return question;
    });
    setForm({ ...form, questions: newQuestions });
  };

  const deleteQuestion = (index) => {
    setForm({
      ...form,
      questions: form.questions.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="mainclass max-w-[540px] min-w-72 md:w-full text-gray-900 overflow-auto">
      <form action="" onSubmit={(event) => handleSendData(event)}>
        <div className="p-2 shadow rounded-lg">
          <h2 className=" font-bold mb-2 text-2xl">Create a Form</h2>
          <div className="mb-2  ">
            <label className="block ">Title of form</label>
            <Input
              type="text"
              className="w-full max-w-4xl p-1 "
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2">Description of form</label>
            <Input
              type="text"
              className="w-full p-1 "
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          {form.questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-2 p-1 ">
              <div className="flex justify-between items-center mb-2">
                <label className="block">Question</label>
                <Button
                  className="bg-white"
                  color="danger"
                  variant="flat"
                  size="sm"
                  onClick={() => deleteQuestion(qIndex)}
                >
                  Remove
                </Button>
              </div>
              <Input
                type="text"
                className="w-full p-1  mb-2"
                value={question.text}
                onChange={(e) => handleInputChange(qIndex, e)}
              />
              {/* <select
              className="w-full p-1  mb-2"
              value={question.type}
              onChange={(e) => handleTypeChange(qIndex, e)}
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="number">Number</option>
            </select> */}
              {/* /dropdown by nextui */}
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
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
                  <DropdownItem key="file" value="file">
                    File
                  </DropdownItem>
                  <DropdownItem key="radio" value="radio">
                    options
                  </DropdownItem>
                  <DropdownItem key="checkbox" value="checkbox">
                    checkbox
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {(question.type === "radio" || question.type === "checkbox") && (
                <>
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <Input
                        isRequired={true}
                        type="text"
                        className="font-bold p-1 w-full rounded mr-2 text-xl"
                        value={option}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                      />
                      <Button
                        className="text-red-500"
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
                        Delete
                      </Button>
                    </div>
                  ))}
                  <Button
                    className="w-full p-1  mb-2 bg-blue-500 text-white"
                    onClick={() => addOption(qIndex)}
                  >
                    Add Option
                  </Button>
                </>
              )}
            </div>
          ))}
          <Button
            className="w-full p-1  mb-2 bg-green-500 text-white"
            onClick={addQuestion}
          >
            Add Question
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full p-1  mb-2 bg-green-500 text-white"
        >
          Create Form
        </Button>
      </form>
    </div>
  );
};

export default CreatorForm;
