import React, { useState } from "react";
import StudentInput from "./components/StudentInput";
import QuizDisplay from "./components/QuizDisplay";
import ResultsPage from "./components/ResultsPage";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);

  const startQuiz = async (classLevel, topic, subject) => {
    // Placeholder for API call
    const fetchedQuestions = await fetchQuestions(classLevel, topic, subject);
    setQuestions(fetchedQuestions);
    setQuizStarted(true);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
  };

  // Placeholder function for API call
  const fetchQuestions = async (standard, topics, subject) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const url = `http://localhost:5000/get_quiz?standard=${standard}&subject=${subject}&topics=${encodeURIComponent(
      topics
    )}`;

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
      console.log(result);
      return result.questions;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-white p-3 lg:p-20">
      {!quizStarted && <StudentInput onStart={startQuiz} />}
      {quizStarted && !quizCompleted && (
        <QuizDisplay questions={questions} onComplete={completeQuiz} />
      )}
      {quizCompleted && <ResultsPage score={3} totalQuestions={5} />}
    </div>
  );
};

export default App;
