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
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/385.png",
      correctAnswer: "Pokemon",
      context: {
        en: "A mythical Pokémon known for its wish-granting powers.",
        es: "Un Pokémon mítico conocido por su capacidad de conceder deseos.",
      },
      name: "Jirachi",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/640px-TensorFlow_logo.svg.png",
      correctAnswer: "Technology",
      context: {
        en: "An open-source machine learning framework developed by Google.",
        es: "Un framework de aprendizaje automático de código abierto desarrollado por Google.",
      },
      name: "TensorFlow",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png",
      correctAnswer: "Pokemon",
      context: {
        en: "An Electric/Ghost-type Pokémon that can possess electronics.",
        es: "Un Pokémon de tipo Eléctrico/Fantasma que puede poseer dispositivos electrónicos.",
      },
      name: "Rotom",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/640px-Kubernetes_logo_without_workmark.svg.png",
      correctAnswer: "Technology",
      context: {
        en: "A platform for automating deployment, scaling, and operations of applications.",
        es: "Una plataforma para automatizar el despliegue, escalado y operaciones de aplicaciones.",
      },
      name: "Kubernetes",
    },

    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ansible_logo.svg/640px-Ansible_logo.svg.png",
      correctAnswer: "Technology",
      context: {
        en: "A simple IT automation platform used for configuration management.",
        es: "Una plataforma de automatización de TI utilizada para las configuraciones.",
      },
      name: "Ansible",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Prometheus_software_logo.svg/640px-Prometheus_software_logo.svg.png",
      correctAnswer: "Technology",
      context: {
        en: "An open-source monitoring and alerting toolkit designed for reliability.",
        es: "Una herramienta de monitoreo y alertas de código abierto diseñada para la confiabilidad.",
      },
      name: "Prometheus",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/791.png",
      correctAnswer: "Pokemon",
      context: {
        en: "A Legendary Pokémon known as the Sun incarnation.",
        es: "Un Pokémon legendario conocido como la encarnación del Sol.",
      },
      name: "Solgaleo",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
      correctAnswer: "Pokemon",
      context: {
        en: "A Legendary Pokémon, said to be the creator of the universe.",
        es: "Un Pokémon legendario, se dice que es el creador del universo.",
      },
      name: "Arceus",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Sdcsdxc.jpg/640px-Sdcsdxc.jpg",
      correctAnswer: "Technology",
      context: {
        en: "A tool for building, changing, and managing infrastructure as code.",
        es: "Una herramienta para construir, cambiar y gestionar infraestructura como código.",
      },
      name: "Terraform",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png",
      correctAnswer: "Pokemon",
      context: {
        en: "A Pokémon that represents the balance of the ecosystem.",
        es: "Un Pokémon que representa el equilibrio del ecosistema.",
      },
      name: "Zygarde",
    },
  ];

  const resultsRef = useRef<HTMLDivElement>(null);
  const shareUrl = "https://pokemonotecnologia.n12.cl";
  const shareText = userLanguage
  ? `Obtuve un  ${((score / questions.length) * 100).toFixed(0)}% de aciertos en el Pokemones vs Tecnologías. Juegalo tú también en`
  : `I scored ${((score / questions.length) * 100).toFixed(0)}% correct answers in the game Pokemons vs Technology. Play it too at`;

  const captureImage = async () => {
    if (resultsRef.current) {
      const canvas = await html2canvas(resultsRef.current);
      const imgData = canvas.toDataURL('image/png');
      return imgData;
    }
    return null;
  };

  

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

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
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

  // Verifica si la pantalla es aproximadamente 1024x600
  if (width >= 1000 && width <= 1024  && height <= 610) {
    return 0.8; // Ajusta la escala a 0.8 solo para pantallas 1024x600
  }

};

  const [scale, setScale] = useState(getScaleFactor());



useEffect(() => {
  const handleResize = () => {
    setScale(getScaleFactor());
  };
  
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);




  return (
    <div className="relative bg-blue min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="fondo.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      <div className="relative w-[90%] md:w-[70%] lg:w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
    
        <img
          src="field.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {showResults ? (
           <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
            }}
            className="absolute inset-0 flex items-center justify-center">
          
            <div className=" w-[80%] sm:w-[100%] h-[80%] items-center justify-center transform-none">
              <div className="fixed inset-0 flex items-center justify-center w-[100%]   transform-none">
                <motion.div
                  className="relative bg-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center overflow-hidden w-[90%] md:w-[70%] lg:w-[70%] h-auto"
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
                      {navigator.language.includes("es")
                        ? ((score / questions.length) * 100) < 40
                          ? "Te queda mucho por aprender de tecnología 😟 !pero no te preocupes 🤗¡, en N12 nos especializamos en buscar profesionales de tecnología (y tambien pokemones) por ti."
                          : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 80
                          ? "Todavía te falta para dominar la diferencia entre tecnologías y pokemones 😅  ¡pero no te preocupes 🤗! en N12 nos especializamos en buscar profesionales de tecnología (y tambien pokemones) por ti."
                          : "Felicitaciones 🥳, dominas casi a la perfección el arte de distinguir tecnologías y pokemones 🤓. En N12 nos especializamos en buscar profesionales de tecnología (y a veces pokemones) con la misma calidad que lo harías tú."
                        : ((score / questions.length) * 100) < 40
                        ? "You have a lot to learn about technology 🤨 but don't worry 🤗, at N12 we specialize in finding technology professionals (and also Pokémon) for you."
                        : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 80
                        ? "You still have a way to go to master the difference between technologies and Pokémon 😅 but don't worry 🤗! At N12 we specialize in finding technology professionals (and also Pokémon) for you."
                        : "🎊Congratulations 🥳, you almost perfectly master the art of distinguishing technologies and Pokémon 🤓. At N12 we specialize in finding technology professionals (and sometimes Pokémon) with the same quality as you would."}
                    </p>
                  )}
                  <a href="https://n12.cl" id="recruiters-link" className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300 font-bentham text-black text-lg sm:text-2xl lg:text-2xl ">
                N12 - Recruiters in Tech
              </a>

                  <div className="mt-8 w-full flex flex-col items-center">
                  
                    <p className="font-bentham text-black text-xl sm:text-3xl lg:text-3xl text-center">
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
          </div>) 
      : (
          <>
            
          
 
            <div className="w-full h-[30%] space-y-6 ">
            <div className={`absolute top-[5%] sm:top-[15%] left-[50%] transform -translate-x-1/2 w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px]  text-center transition-all duration-500 ease-out transform ${animationClass}`}>
              <motion.div
                className="relative bg-white rounded-xl shadow-xl p-6 flex items-center justify-center"
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
                <div className={`absolute top-[0%] sm:top-[11%] left-[50%] transform -translate-x-1/2 w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[250px]  text-center z-10 nesthub:top-[0%] nesthub:w-[100%]  `}>
                  <motion.div
                  className="relative bg-white rounded-xl shadow-xl p-6 flex items-center justify-center w-full max-w-[210px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[300px] nesthub:max-w-[250px]   nesthub:left-[50%]  nesthub:transform -translate-x-1/2 "
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
  className="relative w-full h-full flex justify-center items-center top-[-10%] sm:top-[2%] font-light font-bentham z-0  nesthub:top-[20%]"
  style={{
    transform: `scale(${scale})`,
  }}
>
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

              <div className={`absolute bottom-[10%] flex flex-col sm:flex-row justify-center items-center text-center mx-auto gap-10 px-4 w-full`}>
                <NextP id="next-button" onClick={handleNextQuestion} />
              </div> )}

            </div>

            <div
              className={`absolute bottom-[4%] flex flex-col sm:flex-row justify-center items-center text-center mx-auto gap-10 px-4 w-full ${
                isFlipped ? "z-0" : "z-20"
              }`}
            >
              <div className="flex justify-center items-center w-full sm:max-w-[34%] px-2 ">
                {showPokemonButton && (
                  <Choice
                    id="choice-pokemon"
                    onClick={() => choicesEnabled && handleAnswer("Pokemon")}
                    disabled={!choicesEnabled || isFlipped}
                  />
                )}
              </div>

              {showOr && (
                <div className="absolute flex justify-center items-center w-[15%] sm:w-auto px-0 bg-gradient-to-r from-white to-grey-900 rounded-full border-2 border-white fade-in-up">
                  <span className="font-bentham uppercase text-black text-md sm:text-xl tracking-wider rounded-full">
                    or
                  </span>
                </div>
              )}

              <div className="flex justify-center items-center w-full sm:max-w-[33%] px-2 ">
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