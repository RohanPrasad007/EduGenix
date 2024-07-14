import { useState } from "react";

const StudentInput = ({ onStart }) => {
  const [classLevel, setClassLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRadioChange = (value) => {
    setSelectedClass(value);
    setIsOpen(false);
  };

  return (
    // <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full">
    //   <div className="p-6 bg-gray-200 rounded-lg shadow-md">
    //     <h2 className="text-2xl font-bold mb-4 text-gray-700 ">
    //       Let's Start Learning!
    //     </h2>
    //     <select
    //       className="w-full p-2 mb-4 rounded border border-blue-300"
    //       value={classLevel}
    //       onChange={(e) => setClassLevel(e.target.value)}
    //     >
    //       <option value="">Select your class</option>
    //       {[...Array(10)].map((_, i) => (
    //         <option key={i} value={i + 1}>
    //           Class {i + 1}
    //         </option>
    //       ))}
    //     </select>
    //     <input
    //       type="text"
    //       placeholder="Enter topic"
    //       className="w-full p-2 mb-4 rounded border border-blue-300"
    //       value={topic}
    //       onChange={(e) => setTopic(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       placeholder="Enter subject"
    //       className="w-full p-2 mb-4 rounded border border-blue-300"
    //       value={subject}
    //       onChange={(e) => setSubject(e.target.value)}
    //     />
    //     <button
    //       className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
    //       onClick={() => onStart(classLevel, topic, subject)}
    //     >
    //       Start Quiz
    //     </button>
    //   </div>
    //   <div>
    //     <div style={{ backgroundImage: `url(/study.png)` }}></div>
    //   </div>
    // </div>
    <div className="bg-white min-h-screen rounded-3xl border-2 border-gray-300">
      <div className="flex flex-row justify-between ">
        <div className="w-full lg:w-1/2 p-3 lg:p-10 relative">
          <div className="absolute">
            <img src="/monkey.png" className="w-1/2 h-full" />
          </div>
          <div className="relative p-6 mt-12 md:mt-24 rounded-lg bg-transparent shadow-md overflow-hidden">
            {/* Semi-transparent background */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(/map.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2, // Adjust this value to change the background opacity
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-lg text-end font-bold mb-4 text-[#001454c0] ml-5">
                Please fill the below details
              </h2>
              <div className="relative">
                <button
                  id="dropdownRadioButton"
                  onClick={toggleDropdown}
                  className="text-gray-400 w-full border bg-white border-gray-200 focus:outline-none font-medium rounded-full text-md px-8 py-2.5 text-center flex justify-between items-center mt-12"
                  type="button"
                >
                  {selectedClass
                    ? `Class ${selectedClass}`
                    : "Select your class"}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    id="dropdownDefaultRadio"
                    className="absolute w-full z-20 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 overflow-auto max-h-60" // Added max-h-60 here
                  >
                    <ul
                      className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownRadioButton"
                    >
                      {[...Array(10)].map((_, i) => (
                        <li key={i}>
                          <div className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg">
                            <input
                              id={`default-radio-${i + 1}`}
                              type="radio"
                              value={i + 1}
                              name="default-radio"
                              checked={selectedClass === `${i + 1}`}
                              onChange={() => handleRadioChange(`${i + 1}`)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`default-radio-${i + 1}`}
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Class {i + 1}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter subject"
                className="text-gray-500 w-full border border-gray-200 focus:outline-none font-medium rounded-full text-md px-8 py-2.5 flex justify-between items-center mt-8 bg-white"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter topic"
                className="text-gray-500 w-full border border-gray-200 focus:outline-none font-medium rounded-full text-md px-8 py-2.5 flex justify-between items-center mt-8 bg-white"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />

              <button
                className="w-full bg-[#001454e8] text-white py-3 transition duration-300 mt-8 rounded-xl"
                onClick={() => onStart(classLevel, topic, subject)}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>

        <div
          className="w-full lg:w-1/2 h-screen hidden lg:flex m-8 border justify-center rounded-3xl  
          "
          style={{
            backgroundImage: `url(/study.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="my-10 flex w-full mx-10">
            <img src="/arrow.png" className="w-10 h-10 mr-10" />
            <h1 className="text-4xl font-bold text-white">
              Let's study together
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInput;
