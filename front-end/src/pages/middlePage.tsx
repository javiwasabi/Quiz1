import React, { useState } from "react";
import { ButtonNext } from "../components/buttons";
import Card from "../components/questions";
import { useNavigate } from "react-router-dom";

const Middle: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();

  const questions = [
    {
      imageUrl: "https://cdn-images-1.medium.com/max/1200/0*2iJ2cYEH3kqHrarJ.jpg",
      correctAnswer: "Inventor",
      context: "This person was an inventor",
    },
    {
      imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/MSNBC/Components/Photo/_new/081111-arthur-shawcross-vsmall-12p.jpg",
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

    setAnswered(true);
    setIsFlipped(true);

    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleNextQuestion = () => {
    if (questionCount >= questions.length) {
      setShowResults(true);
      return;
    }

    setCurrentQuestion((prevIndex) => (prevIndex + 1) % questions.length);
    setIsCorrect(false);
    setAnswered(false);
    setIsFlipped(false);
  };

  const handleFinishGame = () => {
    sessionStorage.setItem("finalScore", score.toString());
    navigate("/final");
  };

  return (
    <div className="relative h-screen w-screen">
      <img
        src="./question-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {showResults ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 text-white p-4">
          <h2 className="text-3xl font-bold mb-4">Game Results</h2>
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="flex flex-col items-center">
                <img
                  src={question.imageUrl}
                  alt={`Question ${index + 1}`}
                  className="w-48 h-48 object-cover mb-2 rounded-md"
                />
                <p>
                  <strong>Question {index + 1}:</strong> {question.context}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {question.correctAnswer}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonNext onClick={handleFinishGame} />
          </div>
        </div>
      ) : (
        <>
          {answered && (
            <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8">
              <ButtonNext onClick={handleNextQuestion} />
            </div>
          )}

          <div className="w-1/2 h-1/2 mx-auto flex justify-center items-center bg-gray-100">
            <Card
              imageUrl={questions[currentQuestion].imageUrl}
              context={questions[currentQuestion].context}
              score={score}
              isCorrect={isCorrect}
              isFlipped={isFlipped}
            />
          </div>

    
          {!answered && (
            <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8 font-title">
              <button
                className="relative -top-1 -left-1 bg-blue-600 py-4 px-8 font-medium uppercase text-white rounded-full transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:bg-blue-500 before:rounded-full before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1"
                onClick={() => handleAnswer("Inventor")}
              >
                Inventor
              </button>
              <button
                className="relative -top-1 -left-1 bg-red-600 py-4 px-8 font-medium uppercase text-white rounded-full transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:bg-red-500 before:rounded-full before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1"
                onClick={() => handleAnswer("Murderer")}
              >
                Murderer
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Middle;
