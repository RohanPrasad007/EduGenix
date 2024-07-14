import { motion } from "framer-motion";

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

export default ResultsPage;
