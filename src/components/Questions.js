import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import dotenv from "dotenv";

export default function Questions() {
  const [qType, setqType] = React.useState("plagiarism");

  const baseUrl = "/api/questions";
  function submitForm(e) {
    axios
      .post(
        baseUrl,
        {
          type: qType,
          question: e.target[1].value,
          option1: e.target[2].value,
          option2: e.target[3].value,
        },
        {
          proxy: {
            host: "localhost",
            port: 8080,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
    // console.log(e);
    // console.log(e.target[0].value);
  }

  const qTypes = [
    { value: "plagiarism", label: "Plagiarism" },
    { value: "working together", label: "Working Together" },
    { value: "seeking assistance", label: "Seeking Assistance" },
  ];

  function handleqType(e) {
    setqType(e.value);
  }

  return (
    <div class="questionForm">
      <form onSubmit={submitForm}>
        <div id="formInputs">
          <div id="formList">
            <ul>
              <li>
                <label>Question Type: </label>
              </li>
              <li>
                <label>Question Text: </label>
              </li>
              <li>
                <label>Answer 1: </label>
              </li>
              <li>
                <label>Answer 2: </label>
              </li>
            </ul>
          </div>

          <div id="formListRight">
            <ul>
              <li>
                <div id="dropdown">
                  <Select options={qTypes} onChange={handleqType} />
                </div>
              </li>
              <li>
                <input
                  type="text"
                  id="question"
                  name="question"
                  placeholder="Question Text"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="answer1"
                  name="answer1"
                  placeholder="Answer 1"
                />
              </li>
              <li>
                <input
                  type="text"
                  id="answer2"
                  name="answer2"
                  placeholder="Answer 2"
                />
              </li>
            </ul>
          </div>
        </div>

        <input type="submit" value="Submit" id="submitButton" />
      </form>
    </div>
  );
}
