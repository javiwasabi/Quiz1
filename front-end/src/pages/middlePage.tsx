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
      context: "This person was the inventor of python and a real genius.",
    },
    {
      imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_auto,q_auto:best/MSNBC/Components/Photo/_new/081111-arthur-shawcross-vsmall-12p.jpg",
      correctAnswer: "Murderer",
      context: "Found guilty of killing 2 children and 11 prostitutes, cannibalism and mutilation.",
    },

    
  ];

  const [visibleResults, setVisibleResults] = useState(2);
  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 2); // Muestra dos resultados más
  };

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
    <div className="relative h-screen w-screen bg-black flex justify-center items-center overflow-hidden">
    {/* Fondo general */}
    <div
      className="absolute inset-0 h-full w-full bg-cover bg-center opacity-60"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/hoja-papel-boligrafo-lupa-sobre-mesa-madera_200904-711.jpg')",
      }}
    ></div>
  

  <div className="h-full w-full flex flex-col space-y-4 transform scale-[0.95] md:scale-[0.85] lg:scale-[0.8]">

  
        {showResults ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 font-Merriweather">
            <h2 className="text-4xl font-bold mb-4 font-bentham">Game Results</h2>
            <ul className="flex flex-wrap gap-4 justify-center max-h-[50vh] overflow-auto">
              {questions.slice(0, visibleResults).map((question, index) => (
                <li key={index} className="flex flex-col items-center w-48">
                  <img
                    src={question.imageUrl}
                    alt={`Question ${index + 1}`}
                    className="w-48 h-48 object-cover mb-2 rounded-md"
                  />
                  <p className="text-2xl text-center">
                    <strong>Correct Answer:</strong> {question.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
            {visibleResults < questions.length && (
              <button
                onClick={loadMoreResults}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                See More Results
              </button>
            )}
            <div className="mt-8 mt-[20%]">

              <ButtonNext id="final-button" onClick={handleFinishGame} />
            </div>
          </div>
        ) : (
          <>
            {answered && (
              <div className="absolute bottom-[0%] left-1/2 transform -translate-x-1/2 z-20 flex gap-x-8 text-black">
                <ButtonNext id="next-button" onClick={handleNextQuestion} />

              </div>
            )}

          <div className="w-screen h-screen flex justify-center items-center top-[-10%] bg-transparent relative z-10">
            <div className="w-[60%] sm:w-[55%] md:w-[60%] lg:w-[60%] relative flex bg-transparent left-[10%] z-8">
              <FileCard
                imageUrl={questions[currentQuestion].imageUrl}
                context={questions[currentQuestion].context}
                score={score}
                isCorrect={isCorrect}
                isFlipped={isFlipped}
              />
            </div>
            <div className="w-[60%] sm:w-[60%] md:w-[55%] lg:w-[60%] relative flex justify-center items-center bg-transparent z-9">
              <Card
                imageUrl={questions[currentQuestion].imageUrl}
                context={questions[currentQuestion].context}
                score={score}
                isCorrect={isCorrect}
                isFlipped={isFlipped}
              />
            </div>
          </div>


            <div className="absolute top-[45%] w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center absolute right-0">
              <PolaroidPhoto />
            </div>

            <div className="absolute top-[45%] right-[65%] w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center">
              <PolaroidPhoto />
            </div>
            <div className="absolute top-[45%] left-[50%] w-[40%] sm:w-[35%] md:w-[30%] lg:w-[25%] h-1/2 z-0 flex justify-center items-center"
              style={{ transform: "rotate(22deg)" }}>
              <PolaroidPhoto />
            </div>

            {!answered && (
              <div className="absolute bottom-[0%] w-full flex justify-between items-center px-16 z-10 font-bentham mt-10">
                {showSerialKiller && (
                  <div
                    className="relative w-[50%] max-w-[45%] h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center"
                    style={{
                      background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                      transform: 'rotate(-2deg)',
                    }}
                    onClick={() => handleAnswer("Serial Killer")}
                  >
                    <span className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider">
                      Killer
                    </span>
                  </div>
                )}

                {showInventor && (
                  <div
                    className="relative w-[50%] max-w-[45%] h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center"
                    style={{
                      background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                      transform: 'rotate(3deg)',
                    }}
                    onClick={() => handleAnswer("Inventor")}
                  >
                    <span className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider">
                      Inventor
                    </span>
                  </div>
                )}
          
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
};

export default Middle;
