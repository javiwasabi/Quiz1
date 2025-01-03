import React, { useState } from "react";
import { ButtonNext } from "../components/buttons";
import Card from "../components/questions";

const Middle: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions = [
    {
      imageUrl: "https://cdn-images-1.medium.com/max/1200/0*2iJ2cYEH3kqHrarJ.jpg",
      correctAnswer: "Inventor",
      context: "This person was an inventor",
    },
    {
      imageUrl: "https://example.com/murderer.jpg",
      correctAnswer: "Murderer",
      context: "He was a big criminal.",
    },
  ];

  const handleAnswer = (answer: string) => {
    const isAnswerCorrect = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevIndex) => (prevIndex + 1) % questions.length);
    setIsCorrect(false);
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        src="./question-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute top-4 right-4 z-10">
        <ButtonNext onClick={handleNextQuestion} />
      </div>

      <div className="w-1/2 h-1/2 mx-auto flex justify-center items-center bg-gray-100">
        <Card
          imageUrl={questions[currentQuestion].imageUrl}
          context={questions[currentQuestion].context}
          score={score}
          isCorrect={isCorrect}
        />
      </div>

      <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex space-x-4">
        <button
          className="px-5 py-5 bg-blue-600 text-white text-md opacity-70"
          onClick={() => handleAnswer("Murderer")}
        >
          Murderer
        </button>
        <button
          className="px-5 py-5 bg-red-600 text-white text-md opacity-70"
          onClick={() => handleAnswer("Inventor")}
        >
          Inventor
        </button>
      </div>
    </div>
  );
};

export default Middle;
