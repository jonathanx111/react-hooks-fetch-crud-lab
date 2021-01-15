import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  const questionsList = questions.map(question => {
      return <QuestionItem key={question.id} question={question} questions={questions} setQuestions={setQuestions} />
  })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsList}</ul>
    </section>
  );
}

export default QuestionList;
