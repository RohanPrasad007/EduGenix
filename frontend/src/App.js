import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

// StudentInput component
const StudentInput = ({ onStart }) => {
  const [classLevel, setClassLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div className="p-6 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Let's Start Learning!
      </h2>
      <select
        className="w-full p-2 mb-4 rounded border border-blue-300"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
      >
        <option value="">Select your class</option>
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>
            Class {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter topic"
        className="w-full p-2 mb-4 rounded border border-blue-300"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter subject"
        className="w-full p-2 mb-4 rounded border border-blue-300"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        onClick={() => onStart(classLevel, topic, subject)}
      >
        Start Quiz
      </button>
    </div>
  );
};

// QuizDisplay component
const QuizDisplay = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const question = questions[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        {question.question}
      </h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.label}
            className={`w-full p-2 rounded text-left flex items-center ${
              selectedAnswer === option.label
                ? option.label === question.correctAnswer
                  ? "bg-green-200"
                  : "bg-red-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleAnswer(option.label)}
          >
            {selectedAnswer === option.label &&
              (option.label === question.correctAnswer ? (
                <FaCheck className="mr-2 text-green-600" />
              ) : (
                <FaTimes className="mr-2 text-red-600" />
              ))}
            {option.label}. {option.text}
          </button>
        ))}
      </div>
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-100 rounded"
        >
          <p className="text-blue-800">{question.explanation}</p>
        </motion.div>
      )}
      <div className="flex justify-between mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          <FaChevronLeft className="mr-2" /> Previous
        </button>
        <div className="text-blue-800">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center"
          onClick={nextQuestion}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}{" "}
          <FaChevronRight className="ml-2" />
        </button>
      </div>
      <div className="mt-4 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
    </motion.div>
  );
};

// ResultsPage component
const ResultsPage = ({ score, totalQuestions }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-yellow-100 rounded-lg shadow-md text-center"
    >
      <h2 className="text-3xl font-bold mb-4 text-yellow-800">
        Quiz Complete!
      </h2>
      <p className="text-xl mb-4">
        You scored {score} out of {totalQuestions}
      </p>
      {score === totalQuestions ? (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
      ) : (
        <p className="text-lg mb-4">
          Great effort! Keep learning and try again!
        </p>
      )}
      <button
        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
        onClick={() => window.location.reload()}
      >
        Start New Quiz
      </button>
    </motion.div>
  );
};

// Main App component (unchanged)
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
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!quizStarted && <StudentInput onStart={startQuiz} />}
        {quizStarted && !quizCompleted && (
          <QuizDisplay questions={questions} onComplete={completeQuiz} />
        )}
        {quizCompleted && <ResultsPage score={3} totalQuestions={5} />}
      </div>
    </div>
  );
};

export default App;
