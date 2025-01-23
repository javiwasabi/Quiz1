import React, { useState, useEffect, useRef } from "react";
import { ButtonNext } from "../components/buttons";
import { Card, PolaroidPhoto } from "../components/questions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoMdMail, IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin , IoLogoWhatsapp} from "react-icons/io";
const Middle: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [showSerialKiller, setShowSerialKiller] = useState(false);
  const [showInventor, setShowInventor] = useState(false);
  const [showOr, setShowOr] = useState(true);
  const { t, i18n } = useTranslation();
  const shareOnFacebook = () => {
    const message = `I scored ${score} in this app!`; 
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.example.com&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const message = `I scored ${score} in this app!`; // Traducción en inglés o español
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.example.com&title=${encodeURIComponent(message)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareOnWhatssap = () => {
    const message = `I scored ${score} in this app!`; // Traducción en inglés o español
    const instagramUrl = `https://www.instagram.com/create/style/?text=${encodeURIComponent(message)}`;
    window.open(instagramUrl, '_blank');
  };

  const shareOnInstagram= () => {
    const message = `I scored ${score} in this app!`; // Traducción en inglés o español
    const instagramUrl = `https://www.whatsapp.com`;
    window.open(instagramUrl, '_blank');
  };



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
    setShowOr(false);
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
      setShowOr(false);
  
      const timer1 = setTimeout(() => {
        setShowSerialKiller(true);
      }, 500);
      const timer3 = setTimeout(() => {
        setShowOr(true);
      }, 1200);
  
      const timer2 = setTimeout(() => {
        setShowInventor(true);
      }, 1000);
      
  
      return () => {
        clearTimeout(timer1);
        
        clearTimeout(timer2);
        clearTimeout(timer3);
        
      };
    }
  };

const isSpanish = userLanguage.startsWith('es');
  
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
    const timer3 = setTimeout(() => {
      setShowOr(true);
    }, 1200); 

    const timer2 = setTimeout(() => {
      setShowInventor(true);
    }, 1000); 

    return () => {
      clearTimeout(timer1);

      clearTimeout(timer2);
      clearTimeout(timer3);
 
    };
  }, []);
  useEffect(() => {
    console.log("Puntaje actualizado:", score);
  }, [score]);


  return (
    <div className="bg-black min-h-screen flex items-center justify-center z-0 relative">
  <div className="relative w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ">
    <img
      src="assets/background-IK.jpg"
      alt="Background"
      className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"
    />
    

      <div className="h-[70%] w-[90%] flex flex-col space-y-4 transform  justify-center ">
      {showResults ? (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="  p-6 rounded-md  max-w-4xl w-full flex flex-col items-center">
      {/* Resultados del juego */}
      <h2 className="text-5xl md:text-6xl font-bold mb-4 font-bentham text-center">
      {isSpanish ? "Resultados del Juego" : "Game Results"}
    </h2>

    {questions.length > 0 && (
      <>
      
        <p className="text-2xl md:text-3xl mt-4 text-center">
          {isSpanish 
  
              ? `Tuviste el ${((score / questions.length) * 100).toFixed(0)}% de aciertos`
              : `You had ${((score / questions.length) * 100).toFixed(0)}% correct answers`}
          </p>
      </>
    )}

    {questions.length > 0 && (
      <p className="text-3xl md:text-4xl mt-2 text-center font-bentham">
        {((score / questions.length) * 100) < 40
          ? isSpanish 
            ? "Ups! Parece que no eres un fan" 
            : "Oops! It seems you're not a fan"
          : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 70
          ? isSpanish 
            ? "Parece que sabes algo pero aún falta" 
            : "It seems you know something, but there's room for improvement"
          : isSpanish 
            ? "¡Eres un experto total en identificar nombres!" 
            : "You're a total expert at identifying names!"}
      </p>
    )}

      <div className="mt-8 w-full flex flex-col items-center">
        <p className="font-bold font-bentham text-black text-4xl sm:text-5xl lg:text-5xl text-center">
          {t("share")}
        </p>

        <div className="flex space-x-4 mt-6 sm:mt-8">
  <a href="#" onClick={shareOnWhatssap} id="email-button">
    <IoLogoWhatsapp className="text-black hover:text-green-500 transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
  </a>
  <a href="#" onClick={shareOnInstagram}>
    <IoLogoInstagram className="text-black hover:text-pink-500 transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
  </a>
  <a href="#" onClick={shareOnFacebook}>
    <IoLogoFacebook className="text-black hover:text-blue-600 transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
  </a>
  <a href="#" onClick={shareOnLinkedIn}>
    <IoLogoLinkedin className="text-black hover:text-blue-600 transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl" />
  </a>
        </div>
      </div>
    </div>
  </div>
) 

 : (
  
              <>
                {answered && (
                  <div className="absolute bottom-[0%] left-[70%] transform -translate-x-1/2 z-20 flex gap-x-8 text-black w-full">
                    <ButtonNext id="next-button" onClick={handleNextQuestion} />

                  </div>
                )}

                <div className="w-full h-full flex justify-center items-center top-[-10%] bg-transparent relative z-10">
                  <div
                    className="relative flex bg-transparent z-8 justify-center"
                    style={{
                    }}
                  >
                    <div className="w-[85%] sm:w-[60%]">
                      <Card
                        imageUrl={questions[currentQuestion].imageUrl}
                        context={questions[currentQuestion].context}

                        isFlipped={isFlipped}
                        onAnswer={(answer) => handleAnswer(answer)} 
                        isCorrect= {isCorrect}/>
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

                

              </>
            )}
             {!answered && (
                  <div className="absolute bottom-[-5%] w-[100%] flex justify-center items-center z-10 font-bentham mt-10">
                    {showSerialKiller && (
                      <div
                        className="relative w-[43%] absolute  h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center"
                        style={{
                          background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                          transform: 'rotate(-2deg)',
                        }}
                        onClick={() => handleAnswer("Killer")}
                      >
                        <span className="block text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-left">
                          {t("who")}
                        </span>
                      </div>
                    )}

                    {showOr  && (
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-black mx-2 ">
                      or
                      </span>
                    )}
                    

                    {showInventor && (
                      <div
                        className="relative w-[47%] h-[4rem] bg-yellow-300 text-black py-2 px-0 left-[0%] text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center"
                        style={{
                          background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                          transform: 'rotate(3deg)',
                        }}
                        onClick={() => handleAnswer("Inventor")}
                      >
                        <span className="block text-sm sm:text-2xl md:text-3xl font-bold uppercase tracking-wider">
                        {t("whoi")}
                        </span>
                      </div>
                    )}
                  </div>
                )}

          </div>
          
      </div>
     
    </div>
  );
};

export default Middle;
