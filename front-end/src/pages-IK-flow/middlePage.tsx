import React, { useState, useEffect, useRef } from "react";
import { ButtonNext } from "../components/buttons";
import { Card, PolaroidPhoto } from "../components/questions";
import { useNavigate } from "react-router-dom";
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
  const shareUrl = "https://quiz1-pearl.vercel.app";
  const userLanguage = navigator.language.startsWith("es") ? "es" : "en";
  const shareText = userLanguage
    ? `¡Tuve el siguiente puntaje: ${score} en reconocer caras!`
    : `I scored: ${score} in deciphering faces!`;;
  const [showSerialKiller, setShowSerialKiller] = useState(true);
  const [showInventor, setShowInventor] = useState(true);
  const [showOr, setShowOr] = useState(true);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const scoreRef = useRef(0);
  const isSpanish = userLanguage.startsWith('es');

  const translations: Record<string, Record<string, string>> = {
    en: {
      "Creator of Python, a popular programming language.": "Guido van Rossum - Creator of Python, a popular programming language.",
      "Co-creator of C programming language and Unix OS.": "Dennis Ritchie - Co-creator of C programming language and Unix OS.",
      "Known as the BTK killer, responsible for multiple murders.": "Dennis Rader - Known as the BTK killer, responsible for multiple murders.",
      "Creator of the Java programming language.": "James Gosling - Creator of the Java programming language.",
      "Notorious for the Milwaukee Cannibal murders.": "Jeffrey Dahmer - Notorious for the Milwaukee Cannibal murders.",
      "Infamous serial killer, known for his brutal crimes.": "Ted Bundy - Infamous serial killer, known for his brutal crimes.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Grace Hopper - Pioneer in computer science, worked on UNIVAC and compilers.",
      "Pioneer in computer science, known for developing Dijkstra's algorithm to find shortest paths in graphs.": "Edsger W. Dijkstra - Pioneer in computer science, known for developing Dijkstra's algorithm to find shortest paths in graphs."
    },
    es: {
      "Creator of Python, a popular programming language.": "Guido van Rossum - Creador de Python, un lenguaje de programación popular.",
      "Co-creator of C programming language and Unix OS.": "Dennis Ritchie - Co-creador del lenguaje de programación C y del sistema operativo Unix.",
      "Known as the BTK killer, responsible for multiple murders.": "Dennis Rader - Conocido como el asesino BTK, responsable de múltiples asesinatos.",
      "Creator of the Java programming language.": "James Gosling - Creador del lenguaje de programación Java.",
      "Notorious for the Milwaukee Cannibal murders.": "Jeffrey Dahmer - Conocido por los asesinatos del Caníbal de Milwaukee.",
      "Infamous serial killer, known for his brutal crimes.": "Ted Bundy - Asesino en serie infame, conocido por sus crímenes brutales.",
      "Pioneer in computer science, worked on UNIVAC and compilers.": "Grace Hopper - Pionera en informática, trabajó en UNIVAC y compiladores.",
      "Pioneer in computer science, known for developing Dijkstra's algorithm to find shortest paths in graphs.": "Edsger W. Dijkstra - Pionero en informática, conocido por desarrollar el algoritmo de Dijkstra para encontrar rutas más cortas en grafos."
    }
  };
  

  
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
      imageUrl: "assets/dikstra-2.jpg",
      correctAnswer: "Inventor",
      context: translations[userLanguage]["Pioneer in computer science, known for developing Dijkstra's algorithm to find shortest paths in graphs."],
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


  return (
    <div className="bg-black min-h-screen flex items-center justify-center z-0 relative">
      <div className="relative w-[92%] sm:w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ">
        <img
          src="assets/background-IK.jpg"
          alt="Background"
          className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"
        />
        
        <div className="h-[70%] w-[90%] flex flex-col space-y-4 transform  justify-center ">
          {showResults ? (
               <div className="absolute inset-0 flex items-center justify-center">

           
               <div className="w-[80%] h-full items-center justify-center">
               <div className="fixed inset-0 flex items-center justify-center w-[90%] left-1/2 transform -translate-x-[50%] ">
   <motion.div
     className="relative bg-white   border-2 border-black rounded-xl  p-6 flex flex-col items-center justify-center overflow-hidden w-[90%] md:w-[70%] lg:w-[50%] h-auto"
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
         <p className="poke-name text-lg md:text-2xl mt-2 text-center font-bentham w-[80%]">
        {((score / questions.length) * 100) < 40
          ? isSpanish 
            ? "No te recomendaríamos ir a una conferencia de tecnología 😭, pues podrías pasar más de algún susto ahí ☠. Si buscar profesionales de tecnología es un problema en tu organización, recuerda que en N12 podemos ayudarte" 
            : "We wouldn't recommend you going to a technology conference 😭, as you might get quite a scare there ☠. If finding technology professionals is a problem in your organization, remember that at N12 we can help you "
          : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 80
          ? isSpanish 
            ? "No te recomendaríamos ir a una conferencia de tecnología 😤, pues podrías pasar más de algún susto ahí ☠. Si buscar profesionales de tecnología es un problema en tu organización, recuerda que en N12 podemos ayudarte " 
            : "We wouldn't recommend you going to a technology conference 😤, as you might get quite a scare there ☠. If finding technology professionals is a problem in your organization, remember that at N12 we can help you "
          : isSpanish 
            ? "Felicitaciones 🤩, distingues casi a la perfección a quienes han dado forma al mundo tecnológico en que vivimos. En N12 nos especializamos en identificar a buenos profesionales de tecnología con la misma calidad que lo harías tú" 
            : "Congratulations 🤩, you almost perfectly distinguish those who have shaped the technological world we live in. At N12, we specialize in identifying good technology professionals with the same quality as you would "
        }
      </p>
     )}
 
     <div className="mt-8 w-full flex flex-col items-center">
       <p className="font-bold font-bentham text-black text-xl sm:text-3xl lg:text-3xl text-center">
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
