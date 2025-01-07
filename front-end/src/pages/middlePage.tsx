import React, { useState, useEffect } from "react";
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

  const [showSerialKiller, setShowSerialKiller] = useState(false);
  const [showInventor, setShowInventor] = useState(false);

  const navigate = useNavigate();

  const questions = [
    {
      imageUrl: "https://cdn-images-1.medium.com/max/1200/0*2iJ2cYEH3kqHrarJ.jpg",
      correctAnswer: "Inventor",
      context: "This person was an inventor.",
    },
    {
      imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/MSNBC/Components/Photo/_new/081111-arthur-shawcross-vsmall-12p.jpg",
      correctAnswer: "Murderer",
      context: "He was a big criminal.",
    },
    {
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Ted_Bundy_headshot.jpg",
      correctAnswer: "Murderer",
      context: "He was a big criminal.",
    },  {
      imageUrl: " https://retro-hardware.com/wp-content/uploads/2019/05/KenThompson-240x300.jpg",
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
    setShowSerialKiller(false);
    setShowInventor(false);
  
    setCurrentQuestion((prevIndex) => (prevIndex + 1) % questions.length);
    setIsCorrect(false);
    setAnswered(false);
    setIsFlipped(false);
    setQuestionCount((prevCount) => prevCount + 1);
  

    const timer1 = setTimeout(() => {
      setShowSerialKiller(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowInventor(true);
    }, 1000); 
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };
  

  const handleFinishGame = () => {
    sessionStorage.setItem("finalScore", score.toString());
    navigate("/final");
  };

 
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSerialKiller(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowInventor(true);
    }, 1000); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen">
      <img
        src="https://img.freepik.com/fotos-premium/hoja-papel-boligrafo-lupa-sobre-mesa-madera_200904-711.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showResults ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 text-white p-4 font-Merriweather">
          <h2 className="text-4xl font-bold mb-4 font-bentham">Game Results</h2>
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

          <div className="absolute top-[30%] left-0 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[50%] h-1/2 mx-auto flex bg-transparent relative z-10">
            <div className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] absolute top-[30%] left-0 h-1/2 mx-auto flex justify-center items-center relative top-[-20%] bg-transparent z-10">
              <FileCard
                imageUrl={questions[currentQuestion].imageUrl}
                context={questions[currentQuestion].context}
                score={score}
                isCorrect={isCorrect}
                isFlipped={isFlipped}
              />
            </div>
            <Card
              imageUrl={questions[currentQuestion].imageUrl}
              context={questions[currentQuestion].context}
              score={score}
              isCorrect={isCorrect}
              isFlipped={isFlipped}
            />
          </div>

          <div className="absolute top-0 w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center">
            <PolaroidPhoto />
          </div>

          <div className="absolute top-[0%] left-10 w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center">
            <PolaroidPhoto />
          </div>
          <div className="absolute top-[0%] left-[50%] w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center"
            style={{ transform: "rotate(22deg)" }}>
            <PolaroidPhoto />
          </div>

          {!answered && (
            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 z-10 flex gap-x-8 font-bentham mt-[20%]">
              {showSerialKiller && (
                <div
                  className="relative w-[30%] sm:w-[35%] md:w-[40%] h-[30%] sm:h-[35%] md:h-[40%] bg-no-repeat bg-contain bg-center text-black py-4 px-6 font-medium uppercase text-center transition-all"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => handleAnswer("Serial Killer")}
                >
                  <span className="block text-3xl">Serial Killer</span>
                </div>
              )}

              {showInventor && (
                <div
                  className="relative w-[30%] sm:w-[35%] md:w-[40%] h-[30%] sm:h-[35%] md:h-[40%] bg-no-repeat bg-contain bg-center text-black py-4 px-6 font-medium uppercase text-center transition-all"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => handleAnswer("Inventor")}
                >
                  <span className="block text-3xl">Inventor</span>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Middle;
