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
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCurrentQuestionAnswered(true);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsCurrentQuestionAnswered(false);
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
  let position = ((currentQuestion + 1) / questions.length) * 100;

  console.log(position);
  return (
    <>
      <div className="min-h-screen rounded-3xl border-2 border-gray-300 ">
        <div className="w-full mx-auto">
          <div className="mx-8 mt-5  bg-gray-200 h-auto rounded-xl relative">
            <div className="absolute -top-8 right-0 w-52 hidden md:block">
              <img src="path.png" className="w-full " />
            </div>
            <div className="text-xl text-center font-bold  pt-3 md:text-2xl text-[#001454c0]">
              Please Answer the Questions Carefully!
            </div>
            <div className="text-center  p-2 text-md text-[#001454c0]">
              All the Best !
            </div>
          </div>
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="p-6 mt-24 mx-6 bg-white rounded-lg shadow-md border-2 border-gray-300"
          >
            <div class="relative pt-4">
              <span
                style={{ left: `${position}%` }}
                className="absolute bottom-0 mb-4 -translate-x-1/2 w-12 h-10 bg-white shadow-[0px_12px_30px_0px_rgba(16,24,40,0.1)] rounded-full px-3.5 py-2 text-gray-800 text-xs font-medium flex justify-center items-center after:absolute after:bg-white after:flex after:bottom-[-5px] after:left-1/2 after:-z-10 after:h-3 after:w-3 after:-translate-x-1/2 after:rotate-45"
              >
                {currentQuestion + 1}
              </span>

              <div className="relative flex w-full h-2.5  overflow-hidden rounded-3xl bg-gray-100">
                <div
                  role="progressbar"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  className="flex h-full items-center justify-center bg-[#001454c0]  text-white rounded-3xl"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4 text-blue-800 pt-10">
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
                className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center ${
                  !isCurrentQuestionAnswered
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={nextQuestion}
                disabled={!isCurrentQuestionAnswered}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}{" "}
                <FaChevronRight className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default QuizDisplay;
