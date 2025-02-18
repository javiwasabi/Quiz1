import React, { useState, useEffect, useRef } from "react";
import { ButtonNext } from "../components/buttons";
import { Card, PolaroidPhoto } from "../components/questions";
import { useTranslation } from "react-i18next";
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  FacebookIcon,
  XIcon
} from "react-share";
import { motion } from "framer-motion";

const Middle: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const shareUrl = "https://programadoroasesino.n12.cl";
  const userLanguage = navigator.language.startsWith("es") ? "es" : "en";
  const shareText = userLanguage
    ? `Obtuve un  ${score} de aciertos en el juego Developers vs Asesinos Seriales. Juegalo tú también en`
    : `I scored ${score} correct answers in the game Developers vs Serial Killers. Play it too at`;
  const [showSerialKiller, setShowSerialKiller] = useState(true);
  const [showInventor, setShowInventor] = useState(true);
  const [showOr, setShowOr] = useState(true);
  const { t, i18n } = useTranslation();
  const imageCredits = [
    { url: "https://commons.wikimedia.org/wiki/File:Dennis_Ritchie_2011.jpg", author: "Denise Panyik-Dale", license: "CC BY 2.0" },
    { url: "https://commons.wikimedia.org/wiki/File:Aileen_Wuornos.jpg", author: "Florida Department of Corrections", license: "Public domain" },
    { url: "https://commons.wikimedia.org/wiki/File:John_Wayne_Gacy.jpg", author: "White House photographer", license: "Public domain" },
    { url: "https://commons.wikimedia.org/wiki/File:Ian_Murdock_interview_at_Holiday_Club_hotel_2008_01.jpg", author: "Ilya Schurov", license: "CC BY-SA 2.0" },
    { url: "https://commons.wikimedia.org/wiki/File:Fernando_Corbato.jpg", author: "Jason Dorfman, MIT CSAIL photographer", license: "CC BY-SA 3.0" },
    { url: "https://commons.wikimedia.org/wiki/File:Ken_Thompson_and_Dennis_Ritchie--1973.jpg", author: "Unknown", license: "Public domain" },
    { url: "https://commons.wikimedia.org/wiki/File:Edmund_Kemper_(mug_shot_-_1973)_(cropped).jpg", author: "Santa Cruz County Sheriff's Office", license: "Public domain" },
    { url: "https://commons.wikimedia.org/wiki/File:Grace_Hopper_and_UNIVAC.jpg", author: "Unknown", license: "CC BY 2.0" },
    { url: "https://commons.wikimedia.org/wiki/File:Jeffrey_Dahmer_HS_Yearbook.jpg", author: "Revere Senior High School", license: "Public domain" },
    { url: "https://commons.wikimedia.org/wiki/File:Theodore_Kaczynski,_1968_(re-scanned,_as-is;_de-bordered).jpg", author: "George Bergman", license: "CC BY-SA 4.0" }
  ];

  const scoreRef = useRef(0);
  const isSpanish = userLanguage.startsWith('es');

  const translations: Record<string, Record<string, string>> = {
    en: {
      "Creator of C programming language and Unix OS.": "Dennis Ritchie - Creator of C programming language and Unix OS.",
      "Co-creator of Unix and the Plan 9 OS.": "Ken Thompson - Co-creator of Unix and the Plan 9 OS.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Grace Hopper - Pioneer in computer science, worked on UNIVAC and compilers.",
      "Developer of Debian, a widely used Linux distribution.": "Ian Murdock - Developer of Debian, a widely used Linux distribution.",
      "Key contributor to Multics, influencing modern OS design.": "Fernando Corbató - Key contributor to Multics, influencing modern OS design.",
      "Known as the Unabomber, responsible for multiple attacks.": "Ted Kaczynski - Known as the Unabomber, responsible for multiple attacks.",
      "Notorious for the Milwaukee Cannibal murders.": "Jeffrey Dahmer - Notorious for the Milwaukee Cannibal murders.",
      "Infamous serial killer, known for his brutal crimes.": "Ted Bundy - Infamous serial killer, known for his brutal crimes.",
      "Known for a string of murders and manipulative behavior.": "Aileen Wuornos - Known for a string of murders and manipulative behavior.",
      "Infamous serial killer, responsible for multiple killings.": "John Wayne Gacy - Infamous serial killer, responsible for multiple killings as a clown."
    },
    es: {
      "Creator of C programming language and Unix OS.": "Dennis Ritchie - Creador del lenguaje de programación C y del sistema operativo Unix.",
      "Co-creator of Unix and the Plan 9 OS.": "Ken Thompson - Co-creador de Unix y del sistema operativo Plan 9.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Grace Hopper - Pionera en informática, trabajó en UNIVAC y en compiladores.",
      "Developer of Debian, a widely used Linux distribution.": "Ian Murdock - Desarrollador de Debian, una distribución de Linux ampliamente utilizada.",
      "Key contributor to Multics, influencing modern OS design.": "Fernando Corbató - Contribuyente clave en Multics, influyendo en el diseño de sistemas operativos modernos.",
      "Known as the Unabomber, responsible for multiple attacks.": "Ted Kaczynski - Conocido como el Unabomber, responsable de múltiples atentados.",
      "Notorious for the Milwaukee Cannibal murders.": "Jeffrey Dahmer - Conocido por los asesinatos del Caníbal de Milwaukee.",
      "Infamous serial killer, known for his brutal crimes.": "Ted Bundy - Asesino en serie infame, conocido por sus crímenes brutales.",
      "Known for a string of murders and manipulative behavior.": "Aileen Wuornos - Conocida por una serie de asesinatos y comportamiento manipulador.",
      "Infamous serial killer, responsible for multiple killings.": "John Wayne Gacy - Asesino en serie infame, responsable de múltiples asesinatos vestido como payaso."
    }
  };
  
const questions = [
    {
      imageUrl: "assets/Dennis_Ritchie_2011.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Creator of C programming language and Unix OS."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },{
      imageUrl: "assets/Edmund_Kemper_.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Infamous serial killer, known for his brutal crimes."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/bomb.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Known as the Unabomber, responsible for multiple attacks."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/jhon.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Infamous serial killer, responsible for multiple killings."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
   
    {
      imageUrl: "assets/Grace_Hopper_and_UNIVAC.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Pioneer in computer science, worked on UNIVAC and compilers."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    
    {
      imageUrl: "assets/ian.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Developer of Debian, a widely used Linux distribution."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    
    {
      imageUrl: "assets/fernando.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Key contributor to Multics, influencing modern OS design."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    
    
    
    {
      imageUrl: "assets/aileen.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Known for a string of murders and manipulative behavior."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
    {
      imageUrl: "assets/jeffrey.jpg",
      correctAnswer: "Killer",
      context: translations[userLanguage]["Notorious for the Milwaukee Cannibal murders."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
  {
      imageUrl: "assets/ken2.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Co-creator of Unix and the Plan 9 OS."],
      imageClasses: "grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300",
    },
];

  
  

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
      setShowSerialKiller(true);
      setShowInventor(true);
      setShowOr(true);
  
      
    }
  };

 
  useEffect(() => {
    console.log("Puntaje actualizado:", score);
  }, [score]);
  
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {

    });
  }, [i18n]);
  const getScaleFactor = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
  
    if (width >= 1000 && width <= 1024  && height <= 610) {
      return 0.8; 
    }
  
  };
  
    const [scale, setScale] = useState(getScaleFactor());
    const [resizeFactor, setResizeFactor] = useState(window.innerWidth < 640 ? 0.8 : 1);
  
  useEffect(() => {
    const handleResize = () => {
      setResizeFactor(window.innerWidth < 640 ? 0.8 : 1);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  
  
  useEffect(() => {
    const handleResize = () => {
      setScale(getScaleFactor());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [showCredits, setShowCredits] = useState(false);

  
  



  return (
    <div className="bg-black min-h-screen flex items-center justify-center z-0 relative">
      <div className="relative w-[92%] sm:w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ">
        <img
          src="assets/background-IK.jpg"
          alt="Background"
          className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"
        />
        
        <div className="h-[70%] w-[90%] flex flex-col space-y-4 transform  justify-center nesthub:w-full  ">
        {showResults ? (
            <div
              style={{
                transform: `scale(${resizeFactor})`,
                transformOrigin: "center",
              }}
              className="absolute inset-0 flex items-center justify-center auto nesthub:w-full ">
           
           <div className={`w-[80%] h-[80%] items-center justify-center transform-none auto nesthub:w-full ${showCredits ? "invisible" : ""}`}>

                  <div className="fixed inset-0 flex items-center justify-center w-[100%] transform-none ">
                    <motion.div
                      className="relative bg-white border-2 border-black rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden w-[100%] md:w-[70%] lg:w-[50%] h-auto nesthub:max-h-[450px] nesthub:max-w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <h2 className="poke-name text-2xl md:text-4xl font-bold mb-4 font-bentham text-center w-full">
                        {navigator.language.includes("es") ? `Tuviste ${((score / questions.length) * 100).toFixed(0)}% de aciertos` : `You had ${((score / questions.length) * 100).toFixed(0)}% correct answers`}
                      </h2>
                  
                      {questions.length > 0 && (
                          <p className="poke-name text-lg md:text-2xl mt-2 text-center font-bentham w-[80%] nesthub:text-lg">
                          {((score / questions.length) * 100) < 40
                            ? isSpanish 
                              ? "No te recomendaríamos ir a una conferencia de tecnología 😭, pues podrías pasar más de algún susto ahí ☠. Si buscar profesionales de tecnología es un problema en tu organización, recuerda que en N12 podemos ayudarte." 
                              : "We wouldn't recommend you going to a technology conference 😭, as you might get quite a scare there ☠. If finding technology professionals is a problem in your organization, remember that at N12 we can help you. "
                            : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 80
                            ? isSpanish 
                              ? "No te recomendaríamos ir a una conferencia de tecnología 😤, pues podrías pasar más de algún susto ahí ☠. Si buscar profesionales de tecnología es un problema en tu organización, recuerda que en N12 podemos ayudarte. " 
                              : "We wouldn't recommend you going to a technology conference 😤, as you might get quite a scare there ☠. If finding technology professionals is a problem in your organization, remember that at N12 we can help you. "
                            : isSpanish 
                              ? "Felicitaciones 🤩, distingues casi a la perfección a quienes han dado forma al mundo tecnológico en que vivimos. En N12 nos especializamos en identificar a buenos profesionales de tecnología con la misma calidad que lo harías tú." 
                              : "Congratulations 🤩, you almost perfectly distinguish those who have shaped the technological world we live in. At N12, we specialize in identifying good technology professionals with the same quality as you would. "
                          }
                        </p>
                      )}
                      <a href="https://n12.cl" id="recruiters-link" className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 font-bentham text-black text-lg sm:text-2xl lg:text-2xl nesthub:text-lg ">
                         N12 - Recruiters in Tech
                     </a>
                     <button onClick={() => setShowCredits(true)} className="mt-4 underline">
                     {isSpanish ? "Derechos de autor" : "Copyright"}
                   
                     </button>
                  
                      <div className="mt-8 w-full flex flex-col items-center">
                        <p className="font-bold font-bentham text-black text-xl sm:text-3xl lg:text-3xl text-center nesthub:text-2xl ">
                          {navigator.language.includes("es") ? "Comparte tus resultados" : "Share your results"}
                        </p>
                  
                        <div className="flex space-x-4 mt-6 sm:mt-8">
                          <WhatsappShareButton url={shareUrl} title={shareText}>
                            <WhatsappIcon size={40} round={true} />
                          </WhatsappShareButton>
                  
                          <FacebookShareButton url={shareUrl} title={shareText}>
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>
                  
                          <TwitterShareButton url={shareUrl} title={shareText} hashtags={["Quiz", "DecipheringFaces"]}>
                            <XIcon size={40} round={true} />
                          </TwitterShareButton>
                        </div>
                      </div>
                    </motion.div>
                  </div>  
                </div>

                {showCredits && (
  <div className="  fixed top-1/2 transform -translate-y-[50%] left-1/2 transform -translate-x-[50%] w-screen h-screen flex items-center justify-center z-50 w-full h-full ">
    <div className="  border-2 border-black rounded-xl bg-white p-6 rounded-lg shadow-lg text-center max-w-lg sm:w-[70%]  sm:h-[65%]  w-[100%] h-[70%]  relative">
      <div className="rounded-md text-center justify-center">
        <h2 className="poke-name text-2xl md:text-4xl font-bold mb-4 font-bentham text-center w-full">
          {isSpanish ? "Créditos de las imágenes" : "Image Credits"}
        </h2>
        <ul className="list-disc pl-5 text-mdg md:text-lg mt-2 text-left font-bentham w-[100%] nesthub:text-lg">
          {imageCredits.map((credit, index) => (
            <li key={index} className="mb-2">
              <a
                href={credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" underline break-words"
              >
                {credit.author} ({credit.license})
              </a>
            </li>
          ))}
        </ul>
      </div>

 
      <div className="flex justify-center mt-[30%] sm:mt-[5%]">
        <button
          className="w-[79%] sm:w-[73%] md:w-[73%] h-[4rem] sm:h-[4rem] min-w-[5rem] sm:min-w-[6rem] md:min-w-[8rem] 
                     bg-yellow-300 text-black py-1 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 
                     flex justify-center items-center transform hover:scale-105 transition duration-300 block text-sm sm:text-lg md:text-2xl font-bentham uppercase tracking-wider text-center"
          onClick={() => setShowCredits(false)}
          style={{
            background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
          }}
        >
          {isSpanish ? "CERRAR" : "CLOSE"}
        </button>
      </div>
    </div>
  </div>
)}

           </div>) : (

  
              <>
            
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                {answered && (
                <div className="absolute bottom-[-8%] sm:bottom-[-11%] right-4 md:bottom-15 md:right-6 z-20 transform -translate-y-[8%] left-1/2 transform -translate-x-[50%] w-full">
              
                    <ButtonNext id="next-button" onClick={handleNextQuestion} />

                  </div>
                )}
              </motion.div>

              <div className="w-full h-full flex justify-center items-center top-[-18%] bg-transparent relative z-10">
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
              <motion.div
              
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
               
              >
            <div className=" screen absolute bottom-[-5%] w-full flex justify-center items-center z-10 font-bentham mt-10 space-x-4">
              {showSerialKiller && (
                <div
                  className="relative w-[79%] sm:w-[33%] md:w-[33%] h-[4rem] sm:h-[4rem] min-w-[5rem] sm:min-w-[6rem] md:min-w-[8rem] bg-yellow-300 text-black py-1 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center transform hover:scale-105 transition duration-300 mb-2 sm:mb-0"
                  style={{
                    background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                  }}
                  onClick={() => handleAnswer("Killer")}
                >
                  <span className="block text-sm sm:text-lg md:text-2xl font-bentham uppercase tracking-wider text-center">
                    {t("who")}
                  </span>
                </div>
              )}

              {showOr && (
                <span className="text-xl sm:text-xl md:text-2xl font-bentham uppercase tracking-wider text-black mx-0 mb-2 sm:mb-0 bg-white py-1 px-4 border-2 border-black rounded-lg shadow-md">
                  or
                </span>
              )}

              {showInventor && (
                <div
                  className="relative w-[100%] sm:w-[33%] md:w-[33%] h-[4rem] sm:h-[4rem] min-w-[5rem] sm:min-w-[6rem] md:min-w-[8rem] bg-yellow-300 text-black py-1 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center transform hover:scale-105 transition duration-300 mb-2 sm:mb-0"
                  style={{
                    background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                  }}
                  onClick={() => handleAnswer("Inventor")}
                >
                  <span className="block text-sm sm:text-lg md:text-2xl font-bentham uppercase tracking-wider">
                    {t("whoi")}
                  </span>
                </div>
              )}
            </div>
            </motion.div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Middle;
