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
      imageUrl: "assets/Guido-portrait-2014-curvves.jpg",
      correctAnswer: "Inventor",
      context: "Creator of Python, a popular programming language.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Dennis_Ritchie_2011.jpg",
      correctAnswer: "Inventor",
      context: "Co-creator of C programming language and Unix OS.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/dennis-rader-btk-.jpg",
      correctAnswer: "Killer",
      context: "Known as the BTK killer, responsible for multiple murders.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/James_Gosling_2008-1.jpg",
      correctAnswer: "Inventor",
      context: "Creator of the Java programming language.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/jeffrey-dahmer-4.webp",
      correctAnswer: "Killer",
      context: "Notorious for the Milwaukee Cannibal murders.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Edmund_Kemper_.jpg",
      correctAnswer: "Killer",
      context: "Infamous serial killer, known for his brutal crimes.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Grace_Hopper_and_UNIVAC.jpg",
      correctAnswer: "Inventor",
      context: "Pioneer in computer science, worked on UNIVAC and compilers.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Guido-portrait-2014-curvves.jpg",
      correctAnswer: "Inventor",
      context: "Creator of Python, a popular programming language.",
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
  ];
  
  
  
  const [visibleResults, setVisibleResults] = useState(3);
  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 3);
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
    
    if (questionCount  >= questions.length + 5) {
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
  

  <div className="h-full w-full flex flex-col space-y-4 transform scale-[0.7] md:scale-[0.65] lg:scale-[0.6]">


  
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
              <div className="absolute bottom-[0%] left-[70%] transform -translate-x-1/2 z-20 flex gap-x-8 text-black">
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
