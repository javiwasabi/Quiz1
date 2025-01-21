import React, { useState, useEffect, useRef } from "react";
import { ButtonNext } from "../components/buttons";
import { Card, PolaroidPhoto } from "../components/questions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Middle: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [showSerialKiller, setShowSerialKiller] = useState(false);
  const [showInventor, setShowInventor] = useState(false);
  const { t, i18n } = useTranslation();


  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {

    });
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {

    });
  };

  const navigate = useNavigate();
  const translations = {
    en: {
      "Creator of Python, a popular programming language.": "Creator of Python, a popular programming language.",
      "Co-creator of C programming language and Unix OS.": "Co-creator of C programming language and Unix OS.",
      "Known as the BTK killer, responsible for multiple murders.": "Known as the BTK killer, responsible for multiple murders.",
      "Creator of the Java programming language.": "Creator of the Java programming language.",
      "Notorious for the Milwaukee Cannibal murders.": "Notorious for the Milwaukee Cannibal murders.",
      "Infamous serial killer, known for his brutal crimes.": "Infamous serial killer, known for his brutal crimes.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Pioneer in computer science, worked on UNIVAC and compilers.",
      "Pioneer in multiple fields, including computer science and game theory.": "Pioneer in multiple fields, including computer science and game theory.",
    },
    es: {
      "Creator of Python, a popular programming language.": "Creador de Python, un lenguaje de programación popular.",
      "Co-creator of C programming language and Unix OS.": "Co-creador del lenguaje de programación C y del sistema operativo Unix.",
      "Known as the BTK killer, responsible for multiple murders.": "Conocido como el asesino BTK, responsable de múltiples asesinatos.",
      "Creator of the Java programming language.": "Creador del lenguaje de programación Java.",
      "Notorious for the Milwaukee Cannibal murders.": "Conocido por los asesinatos del Caníbal de Milwaukee.",
      "Infamous serial killer, known for his brutal crimes.": "Asesino en serie infame, conocido por sus crímenes brutales.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Pionera en informática, trabajó en UNIVAC y compiladores.",
      "Pioneer in multiple fields, including computer science and game theory.": "Pionero en múltiples campos, incluyendo informática y teoría de juegos.",
    },
  };
  
  const userLanguage = navigator.language.startsWith("es") ? "es" : "en";
  
  const questions = [
    {
      imageUrl: "assets/Guido-portrait-2014-curvves.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Creator of Python, a popular programming language."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Dennis_Ritchie_2011.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Co-creator of C programming language and Unix OS."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/dennis-rader-btk-.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Known as the BTK killer, responsible for multiple murders."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/James_Gosling_2008-1.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Creator of the Java programming language."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/jeffrey-dahmer-4.webp",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Notorious for the Milwaukee Cannibal murders."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Edmund_Kemper_.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Infamous serial killer, known for his brutal crimes."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/Grace_Hopper_and_UNIVAC.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Pioneer in computer science, worked on UNIVAC and compilers."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/John_von_Neumann.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Pioneer in multiple fields, including computer science and game theory."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
  ];
  
  const scoreRef = useRef(0);
  const handleAnswer = (answer: string) => {
    if (answered) return;
  
    const isAnswerCorrect = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);
  
    if (isAnswerCorrect) {
      scoreRef.current += 1; 
      setScore(scoreRef.current); 
    }
  
    console.log("Puntaje (ref):", scoreRef.current);
    console.log("Pregunta actual:", currentQuestion);
    console.log("Respuesta dada:", answer);
    console.log("Respuesta correcta:", questions[currentQuestion].correctAnswer);
    console.log("¿Es correcta?:", isAnswerCorrect);
  
    setAnswered(true);
    setIsFlipped(true);
    setShowSerialKiller(false);
    setShowInventor(false);
  };
  const handleNextQuestion = () => {
    if (!answered) return;
  
    if (currentQuestion + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setIsCorrect(false);
      setAnswered(false); 
      setIsFlipped(false);
      setShowSerialKiller(false);
      setShowInventor(false);
  
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
    }
  };
  
  const [visibleResults, setVisibleResults] = useState(3);
  const loadMoreResults = () => {
    setVisibleResults((prev) => prev + 3);
  };

  const handleFinishGame = () => {
    console.log("Puntaje final guardado:", score);
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
  useEffect(() => {
    console.log("Puntaje actualizado:", score);
  }, [score]);


  return (
    <div className="bg-black min-h-screen flex items-center justify-center z-0 relative">
  <div className="relative w-[80%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10">
    <img
      src="assets/background-IK.jpg"
      alt="Background"
      className="absolute inset-0 h-full w-full object-cover z-0"
    />
    

      <div className="h-full w-full flex flex-col space-y-4 transform scale-[1] md:scale-[0.85] lg:scale-[0.9] justify-center ">
            {showResults ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 font-Merriweather ">
                <h2 className="text-4xl font-bold mb-4 font-bentham">Game Results</h2>
                <ul className="flex flex-wrap gap-4 justify-center max-h-[30vh] overflow-auto">
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
                    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-blue-700"
                  >
                    See More Results
                  </button>
                )}
                <div className="mt-8 mt-[20%] absolute bottom-0">

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

                <div className="w-full h-full flex justify-center items-center top-[-10%] bg-transparent relative z-10">
                  <div
                    className="relative flex bg-transparent z-8 justify-center"
                    style={{
                      width: "70%", 
                    }}
                  >
                    <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%]">
                      <Card
                        imageUrl={questions[currentQuestion].imageUrl}
                        context={questions[currentQuestion].context}

                        isFlipped={isFlipped}
                        onAnswer={(answer) => handleAnswer(answer)} />
                    </div>
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
                  <div className="absolute bottom-[4%] w-full flex justify-between items-center z-10 font-bentham mt-10">
                    {showSerialKiller && (
                      <div
                        className="relative w-[50%] max-w-[45%] h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center"
                        style={{
                          background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                          transform: 'rotate(-2deg)',
                        }}
                        onClick={() => handleAnswer("Killer")}
                      >
                        <span className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider">
                        {t("who")}
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
      {t("changeLanguageButton") && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => changeLanguage("en")}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            {t("englishButton")}
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-green-600"
          >
            {t("spanishButton")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Middle;
