import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import dotenv from "dotenv";

export default function Questions() {
  const [lvl, setLvl] = React.useState("1");
  const [correctAns1, setCorrectAns1] = React.useState(false);
  const [correctAns2, setCorrectAns2] = React.useState(false);
  const [correctAns3, setCorrectAns3] = React.useState(false);
  const [correctAns4, setCorrectAns4] = React.useState(false);

  const baseUrl = "/api/questions";
  function submitForm(e) {
    console.log(e.target);
    axios
      .post(
        baseUrl,
        {
          level: lvl,
          question: e.target[1].value,
          option1: e.target[2].value,
          option2: e.target[4].value,
          option3: e.target[6].value,
          option4: e.target[8].value,
          correctOptions: [
            e.target[3].checked,
            e.target[5].checked,
            e.target[7].checked,
            e.target[9].checked,
          ],
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

  const lvls = [
    { value: "Level_One", label: "1" },
    { value: "Level_Two", label: "2" },
    { value: "Level_Three", label: "3" },
  ];

  function handleLvl(e) {
    setLvl(e.value);
  }

  function toggleCheckbox(e) {}

  return (
    <div class="questionForm">
      <form onSubmit={submitForm}>
        <div id="formInputs">
          <div id="formList">
            <ul>
              <li>
                <label>Level:</label>
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
              <li>
                <label>Answer 3: </label>
              </li>
              <li>
                <label>Answer 4: </label>
              </li>
            </ul>
          </div>

          <div id="formListRight">
            <ul>
              <li>
                <div className="dropdown">
                  <Select options={lvls} onChange={handleLvl} />
                </div>
              </li>
              <li>
                <input
                  type="text"
                  id="question"
                  name="question"
                  placeholder="Question Text"
                />
                <label>Correct Answers:</label>
              </li>

              <li>
                <input
                  type="text"
                  id="answer1"
                  name="answer1"
                  placeholder="Answer 1"
                />
                <input
                  type="checkbox"
                  id="cb1"
                  name="cb1"
                  value={correctAns1}
                />
              </li>
              <li>
                <input
                  type="text"
                  id="answer2"
                  name="answer2"
                  placeholder="Answer 2"
                />
                <input
                  type="checkbox"
                  id="cb2"
                  name="cb2"
                  value={correctAns2}
                />
              </li>
              <li>
                <input
                  type="text"
                  id="answer3"
                  name="answer3"
                  placeholder="Answer 3"
                />
                <input
                  type="checkbox"
                  id="cb3"
                  name="cb3"
                  value={correctAns3}
                />
              </li>
              <li>
                <input
                  type="text"
                  id="answer4"
                  name="answer4"
                  placeholder="Answer 4"
                />
                <input
                  type="checkbox"
                  id="cb4"
                  name="cb4"
                  value={correctAns4}
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
