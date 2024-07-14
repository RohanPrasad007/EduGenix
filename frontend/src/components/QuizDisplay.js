import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

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

export default QuizDisplay;
