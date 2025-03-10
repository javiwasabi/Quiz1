import React, { useEffect, useRef, useState } from "react";
import {  NextP, Choice} from "../components/buttons";
import { useNavigate } from "react-router-dom";
import "../styles/poke.css";
import "../styles/background.css";
import { CardPok } from "../components/questions";
import { motion } from "framer-motion";
import html2canvas from 'html2canvas'

import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  FacebookIcon,

  XIcon
} from "react-share";


const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPokemonButton, setShowPokemonButton] = useState(true);
  const [showTechnologyButton, setShowTechnologyButton] = useState(true);
  const [showOr, setShowOr] = useState(true);
  const [isSpanish, setIsSpanish] = useState(false);
  const userLanguage = navigator.language.startsWith("es") ? "es" : "en";
  const [choicesEnabled, setChoicesEnabled] = useState(true);
  const [animationClass, setAnimationClass] = useState("");
  
 
  const questions = [
    {
      imageUrl: "assets/dorian.webp",
      correctAnswer: "Pokemon",
      context: {
        en: "Dorian, the man who never aged, but whose portrait bore the marks of time.\n\n- The Picture of Dorian Gray (Oscar Wilde)",
        es: "Dorian, el hombre que nunca envejecía, pero cuyo retrato escondía el tiempo.\n\n- El retrato de Dorian Gray (Oscar Wilde)"
      },
      name: "Dorian"
    },
    {
      imageUrl: "assets/ansible.png",
      correctAnswer: "Technology",
      context: {
        en: "A simple IT automation platform used for configuration management.",
        es: "Una plataforma de automatización de TI utilizada para las configuraciones.",
      },
      name: "Ansible"
    },
    {
      imageUrl: "assets/baldur.jpg",
      correctAnswer: "Pokemon",
      context: {
        en: "Baldur, a Norse god of light and purity, loved by all but fell due to Loki's trickery.\n\n- Norse Mythology",
        es: "Baldur, dios nórdico de la luz y la pureza, amado por todos pero fue engañado por Loki.\n\n- Mitología nórdica"
      },
      name: "Baldur"
    },
    {
      imageUrl: "assets/istio.png",
      correctAnswer: "Technology",
      context: {
        "en": "An open-source service mesh that provides observability, security, and traffic management for microservices.",
        "es": "Un service mesh de código abierto que proporciona observabilidad, seguridad y gestión del tráfico para microservicios."
      },
      name: "Istio"
    },    
    {
      imageUrl: "assets/phoebus.jpg",
      correctAnswer: "Pokemon",
      context: {
        en: "Phoebus, another name for Apollo, associated with the sun, music, and prophecy.\n\n- Greek Mythology",
        es: "Phoebus, otro nombre de Apolo, asociado con el sol, la música y la profecía.\n\n- Mitología griega"
      },
      name: "Phoebus"
    },
    {
      imageUrl: "assets/terra.jpg",
      correctAnswer: "Technology",
      context: {
        en: "A tool for building, changing, and managing infrastructure as code.",
        es: "Una herramienta para construir, cambiar y gestionar infraestructura como código.",
      },
      name: "Terraform"
    },
    {
      imageUrl: "assets/erebus.webp",
      correctAnswer: "Pokemon",
      context: {
        en: "Erebus, the primordial deity of darkness.\n\n- Greek Mythology",
        es: "Érebo, la deidad primordial de la oscuridad.\n\n- Mitología griega"
      },
      name: "Erebus"
    },
    {
      imageUrl: "assets/kuber.png",
      correctAnswer: "Technology",
      context: {
        en: "A platform for automating deployment, scaling, and operations of applications.",
        es: "Una plataforma para automatizar el despliegue, escalado y operaciones de aplicaciones.",
      },
      name: "Kubernetes"
    },
    {
      imageUrl: "assets/vanhelsing.jpg",
      correctAnswer: "Pokemon",
      context: {
        en: "Van Helsing, a fearless vampire hunter.\n\n- Dracula (Bram Stoker)",
        es: "Van Helsing, un intrépido cazador de vampiros.\n\n- Drácula (Bram Stoker)"
      },
      name: "Van Helsing"
    },
    {
      imageUrl: "assets/tensor.png",
      correctAnswer: "Technology",
      context: {
        en: "An open-source machine learning framework developed by Google.",
        es: "Un framework de aprendizaje automático de código abierto desarrollado por Google.",
      },
      name: "TensorFlow"
    }
  ];
  

  const shareUrl = "https://zealous-ocean-07a53d20f.6.azurestaticapps.net/tecnologiaofantasia";
  const shareText =  isSpanish ?
   `Obtuve un  ${((score / questions.length) * 100).toFixed(0)}% de aciertos en el juego Personajes fantásticos vs Tecnologías digitales. Juegalo tú también en`
  : `I scored ${((score / questions.length) * 100).toFixed(0)}% correct answers in the game Fantasy Characters vs Digital Technology. Play it too at`;

  

  useEffect(() => {
    const userLanguage = navigator.language || navigator.languages[0];
    setIsSpanish(userLanguage.startsWith("es"));
  }, []);
  

  function getBrowserLanguage() {
    const lang = navigator.language || navigator.language;
    if (lang.startsWith("es")) return "es"; 
    return "en";
  }
  

  function renderQuestions(questions: any[]) {
    const language = getBrowserLanguage();
    questions.forEach((question) => {
      console.log({
        imageUrl: question.imageUrl,
        correctAnswer: question.correctAnswer,
        context: question.context[language] || question.context["en"],
        name: question.name,
      });
    });
  }
  
  renderQuestions(questions);
  

  

  const handleAnswer = (answer: string) => {
    const isAnswerCorrect = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setAnswered(true);
    setIsFlipped(true);
    setShowPokemonButton(false);
    setShowTechnologyButton(false);
    setShowOr(false);
    setChoicesEnabled(false); 
  };

  const [shuffledQuestions, setShuffledQuestions] = useState([...questions]);

useEffect(() => {
  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  setShuffledQuestions(shuffleArray([...questions]));
}, []);

const handleNextQuestion = () => {
  if (currentQuestion + 1 >= shuffledQuestions.length) {
    setShowResults(true);
  } else {
    setCurrentQuestion((prev) => prev + 1);
    setIsCorrect(false);
    setAnswered(false);
    setIsFlipped(false);
    setShowPokemonButton(true);
    setShowTechnologyButton(true);
    setShowOr(true);
    setChoicesEnabled(true);
  }
};


  

  useEffect(() => {

    if (!isFlipped) {
      setAnimationClass("opacity-100 scale-100");
    } else {
      setAnimationClass("opacity-0 scale-95");
    }
  }, [isFlipped]);
const getScaleFactor = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;


  if ((width >= 1000 && width <= 1024  && height <= 610) ||(width >= 1000 && width <= 1930  && height <= 1010)) {
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
const worksAndAuthors = [
  {
    name: "Dorian",
    work: isSpanish ? "El retrato de Dorian Gray" :"The Picture of Dorian Gray",
    author: "Oscar Wilde"
  },
  {
    name: "Baldur",
    work:  isSpanish ? "Mitología nórdica" : "Norse Mythology",
    author:   isSpanish ? "Leyendas nórdicas": "Norse Legends"
  },
  {
    name: "Phoebus",
    work:  isSpanish ? "Mitología griega": "Greek Mythology",
    author:  isSpanish ? "Antiguas historias griegas": "Various Ancient Greek Sources"
  },
  {
    name: "Erebus",
    work:  isSpanish ? "Mitología griega": "Greek Mythology",
    author:   isSpanish ? "Antiguas historias griegas": "Various Ancient Greek tales"
  },
  {
    name: "Van Helsing",
    work: "Dracula",
    author: "Bram Stoker"
  }
];
const [showCredits, setShowCredits] = useState(false);






  return (
    <div className="relative bg-blue min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="fondo.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      <div className="relative w-[90%] md:w-[70%] lg:w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
    
      <img
          src="/tecnologiaofantasia/assets/fondoo.webp"
          alt="Background"
           className="absolute inset-0 h-full w-full object-cover"
        />
        {showResults ? (
            <div
              style={{
                transform: `scale(${resizeFactor})`,
                transformOrigin: "center",
              }}
              className="absolute inset-0 flex items-center justify-center auto nesthub:w-full ">
           
                <div className="w-[80%] h-[80%] items-center justify-center transform-none auto nesthub:w-full ">
                  <div className="fixed inset-0 flex items-center justify-center w-[100%] transform-none ">
                    <motion.div
                      className="relative bg-white border-2 border-black rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden w-[100%] md:w-[70%] lg:w-[50%] h-auto nesthub:max-h-[450px] nesthub:w-[70%]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <h2 className="poke-name text-2xl md:text-4xl font-bold mb-4 font-bentham text-center w-full font-bold ">
                        {navigator.language.includes("es") ? `Tuviste ${((score / questions.length) * 100).toFixed(0)}% de aciertos` : `You had ${((score / questions.length) * 100).toFixed(0)}% correct answers`}
                      </h2>
                  
                      {questions.length > 0 && (
  <p className="poke-name text-xl md:text-2xl mt-2 text-center font-bentham w-[80%] nesthub:text-lg">
    {((score / questions.length) * 100) < 40
      ? isSpanish 
        ? "Te queda mucho por aprender de tecnología aún 😭, pero no te preocupes, en N12 nos especializamos en buscar profesionales de tecnología por ti." 
        : "You still have a lot to learn about technology 😭, but don't worry, at N12 we specialize in finding tech professionals for you."
      : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 80
      ? isSpanish 
        ? "Todavía te falta para dominar la diferencia entre tecnologías y personajes de fantasía 😤, pero no te preocupes, en N12 nos especializamos en buscar profesionales de tecnología por ti." 
        : "You’re still not quite there when it comes to distinguishing between technologies and fantasy characters 😤, but don't worry, at N12 we specialize in finding tech professionals for you."
      : isSpanish 
        ? "Felicitaciones 🤩, dominas casi a la perfección las distinciones entre tecnologías del mundo real y personajes de fantasía. En N12 nos especializamos en buscar profesionales de tecnología con la misma calidad que lo harías tú." 
        : "Congratulations 🤩, you have mastered the distinctions between real-world technologies and fantasy characters almost perfectly. At N12, we specialize in finding tech professionals with the same level of quality as you would."
    }
  </p>
)}

                      <a href="https://n12.cl" id="recruiters-link" className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 font-bentham text-black text-xl sm:text-2xl lg:text-2xl nesthub:text-lg ">
                         N12 - Recruiters in Tech
                     </a>
                     <button onClick={() => setShowCredits(true)} className="mt-4 underline font-bentham text-xl md:text-2xl">
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
                  
                  
                          <TwitterShareButton url={shareUrl} title={shareText}  hashtags={["Quiz", "N12 ", "RecruitersInTech"]}>
                            <XIcon size={40} round={true} />
                          </TwitterShareButton>
                        </div>
                      </div>
                    </motion.div>
                  </div>  
                </div>

                {showCredits && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 font-bentham rounded-xl h-full">
                  <div className="bg-white p-4 md:p-6 rounded-lg w-[90%] max-w-[400px] max-h-[80vh] overflow-auto flex flex-col items-center font-bentham">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                      {isSpanish ? "Derechos de autor" : "Copyright"}
                    </h2>
                    <ul className="list-disc pl-5 text-xl md:text-2xl ">
                      {worksAndAuthors.map((item, index) => (
                        <li key={index} className="mb-2">
                          <i>{item.work}</i> {isSpanish? "de": "by"} {item.author}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setShowCredits(false)}
                      className="bg-gray-200 flex items-center justify-center w-auto min-w-[120px] px-6 py-3 mt-6 text-lg sm:text-xl font-semibold uppercase rounded-full transition-all duration-300 hover:bg-gray-300"
                    >
                      {isSpanish ? "Cerrar" : "Close"}
                    </button>


                    
                  </div>
                </div>
              )}


           </div>) : (

          <>
            
          
 
            <div className="w-full h-[30%] space-y-6 ">
              <div className={` z-10 absolute mypc:top-[0%] top-[5%] sm:top-[6%] left-[50%] nesthub:left-[58%] transform -translate-x-1/2 w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[350px] nesthub:w- text-center transition-all duration-500 ease-out transform ${animationClass}`}>
                <motion.div
                  className="relative bg-white shadow-xl p-6 flex items-center justify-center nesthub:w-[65%] "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bentham">
                    {questions[currentQuestion].name}
                  </h3>
                </motion.div>
              </div>

              {isFlipped && (
                  <div className={`absolute top-[0%] sm:top-[2%] left-[50%] transform -translate-x-1/2 w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[350px]  text-center z-10 nesthub:top-[0%] nesthub:w-[100%]  `}>
                    <motion.div
                    className="relative bg-white shadow-xl p-6 flex items-center justify-center w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[350px] nesthub:w-[65%]   nesthub:left-[50%]  nesthub:transform nesthub:-translate-x-1/2 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  
                    style={{
                      boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                  <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bentham text-black w-full">
                    {isSpanish
                      ? isCorrect
                        ? "¡Correcto!"
                        : "¡Incorrecto!"
                      : isCorrect
                      ? "Correct!"
                      : "Incorrect!"
                    }
                  </h1>
                </motion.div>
              </div>
                )}

              <div
                className="relative w-full h-full flex justify-center items-center top-[-3%] sm:top-[-5%] font-light font-bentham z-0  nesthub:top-[0%]"
                style={{
                  transform: `scale(${scale})`,
                }}>
                <CardPok
                  imageUrl={questions[currentQuestion].imageUrl}
                  context={questions[currentQuestion].context[getBrowserLanguage()] || questions[currentQuestion].context["en"]}
                  score={score}
                  isCorrect={isCorrect}
                  isFlipped={isFlipped}
                  onNext={handleNextQuestion}
                  namep={questions[currentQuestion].name}
                />
              </div>


              {isFlipped && (

              <div className={`absolute bottom-[10%] nesthub:absolute bottom-[6%]  flex flex-col sm:flex-row justify-center items-center text-center mx-auto gap-10 px-4 w-full`}>
                <NextP id="next-button" onClick={handleNextQuestion} />
              </div> )}

            </div>
            <div
  className={`absolute bottom-[6%] flex flex-row justify-center items-center text-center mx-auto gap-4 px-4 w-full ${
    isFlipped ? "z-0" : "z-20"
  }`}
>
  {/* Choice Pokemon */}
  <div className="flex justify-center items-center w-auto max-w-[34%] px-2">
    {showPokemonButton && (
      <Choice
        id="choice-pokemon"
        onClick={() => choicesEnabled && handleAnswer("Pokemon")}
        disabled={!choicesEnabled || isFlipped}
      />
    )}
  </div>

  {/* OR text */}
  {showOr && (
    <div className="flex justify-center items-center px-2 bg-gradient-to-r from-white to-grey-900 rounded-full border-2 border-white fade-in-up">
      <span className="font-bentham uppercase text-black text-xs sm:text-md md:text-xl tracking-wider">
      {isSpanish? "o": "or"}
      </span>
    </div>
  )}

  {/* Choice Technology */}
  <div className="flex justify-center items-center w-auto max-w-[34%] px-2">
    {showTechnologyButton && (
      <Choice
        id="choice-technology"
        onClick={() => choicesEnabled && handleAnswer("Technology")}
        disabled={!choicesEnabled || isFlipped}
      />
    )}
  </div>
</div>


          </>
        )}
        
      </div>
    </div>
  );
};

export default Game;