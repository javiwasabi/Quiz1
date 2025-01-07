import React, { useState } from "react";
import { ButtonNext } from "../components/buttons";
import { FileCard, Card, PolaroidPhoto } from "../components/questions";
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
        src="https://img.freepik.com/fotos-premium/hoja-papel-boligrafo-lupa-sobre-mesa-madera_200904-711.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showResults ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 text-white p-4">
          <h2 className="text-3xl font-bold mb-4 font-title">Game Results</h2>
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="flex flex-col items-center">
                <img
                  src={question.imageUrl}
                  alt={`Question ${index + 1}`}
                  className="w-48 h-48 object-cover mb-2 rounded-md"
                />
                <p className="text-2xl">
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
            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8 text-black">
              <ButtonNext onClick={handleNextQuestion} />
            </div>
          )}
          <div className="w-[80%] sm:w-[60%] md:w-[55%] lg:w-[50%] h-1/2 mx-auto flex justify-center items-center bg-transparent relative z-10">
            <Card
              imageUrl={questions[currentQuestion].imageUrl}
              context={questions[currentQuestion].context}
              score={score}
              isCorrect={isCorrect}
              isFlipped={isFlipped}
            />
          </div>

          <div className="absolute top-0 w-1/2 h-1/2 z-0 flex justify-center items-center">
            <PolaroidPhoto />
          </div>
          <div className="absolute top-[30%] left-10 w-1/2 h-1/2 z-0 flex justify-center items-center">
            <PolaroidPhoto />
          </div>

          <div className="w-[80%] sm:w-[60%] md:w-[55%] lg:w-[50%] h-1/2 mx-auto flex justify-center items-center relative top-[-20%] bg-transparent z-10">
            <FileCard
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
                className="relative bg-red-300 text-black py-4 px-6 font-medium uppercase text-center shadow-lg border-b-4 border-red-400 rounded-md hover:shadow-xl transition-all"
                style={{
                  transform: "rotate(-3deg)",
                }}
                onClick={() => handleAnswer("Inventor")}
              >
                Inventor
              </button>
              <button
                className="relative bg-blue-300 text-black py-4 px-6 font-medium uppercase text-center shadow-lg border-b-4 border-blue-400 rounded-md hover:shadow-xl transition-all"
                style={{
                  transform: "rotate(2deg)",
                }}
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
