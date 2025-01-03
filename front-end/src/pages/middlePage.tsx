import React, { useState, useEffect } from "react";
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
     
      sessionStorage.setItem("finalScore", score.toString());
      navigate("/final");
      return;
    }

    setCurrentQuestion((prevIndex) => (prevIndex + 1) % questions.length);
    setIsCorrect(false);
    setAnswered(false);
    setIsFlipped(false); 
  };

  useEffect(() => {
    
    if (questionCount >= questions.length) {
      sessionStorage.setItem("finalScore", score.toString()); 
      navigate("/final"); 
    }
  }, [questionCount, score, navigate]);

  return (
    <div className="relative h-screen w-screen">
      <img
        src="./question-image.webp"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Botón Next solo aparece cuando se responde */}
      {answered && (
        <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8">
          <ButtonNext onClick={handleNextQuestion} />
        </div>
      )}

      <div className="w-1/2 h-1/2 mx-auto flex justify-center items-center bg-gray-100  ">
        <Card
          imageUrl={questions[currentQuestion].imageUrl}
          context={questions[currentQuestion].context}
          score={score}
          isCorrect={isCorrect}
          isFlipped={isFlipped} 
        />
      </div>


      {!answered && (
        <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8">
        <button
          className="relative bg-blue-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-blue-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1 z-10"
          onClick={() => handleAnswer("Murderer")}
        >
          Murderer
        </button>
        <button
          className="relative bg-red-600 text-white font-medium text-lg py-4 px-8 rounded-full transition-all before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-red-500 before:rounded-full before:content-[''] before:transition-all hover:top-0 hover:left-0 hover:before:top-0 hover:before:left-0 active:top-1 active:left-1 active:before:top-1 active:before:left-1 z-10"
          onClick={() => handleAnswer("Inventor")}
        >
          Inventor
        </button>
      </div>
      )}
    </div>
  );
};

export default Middle;
