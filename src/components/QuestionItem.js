import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleAnswerChange(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(event.target.value, 10)
      })
    })
      .then(response => response.json())
      .then(question => {
        console.log(questions)
        const newQuestionsArray = questions.map(quest => {
          return quest.id === question.id ? question : quest
        })
        setQuestions(newQuestionsArray)
      })
  }

  function handleDeleteChange(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(() => {
        const afterDeleteQuestionsArray = questions.filter(q => q.id !== id)
        setQuestions(afterDeleteQuestionsArray)
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteChange}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
