import React, { useState } from "react";
import { ButtonNext, NextP, Choice, PokemonCard } from "../components/buttons";
import { useNavigate } from "react-router-dom";
import "../styles/poke.css";
import "../styles/background.css";
import { CardPok } from "../components/questions";
import { IoMdMail, IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin , IoLogoWhatsapp} from "react-icons/io";

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
  const navigate = useNavigate();
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
    const instagramUrl = `https://www.instagram.com/create/style/?text=${encodeURIComponent(message)}`;
    window.open(instagramUrl, '_blank');
  };
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
        es: "Una plataforma de automatización de TI utilizada para la gestión de configuraciones.",
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
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setIsCorrect(false);
      setAnswered(false);
      setIsFlipped(false);

      setShowPokemonButton(false);
      setShowTechnologyButton(false);
      setShowOr(false);

      const timer1 = setTimeout(() => {
        setShowPokemonButton(true);
      }, 500);
      const timer3 = setTimeout(() => {
        setShowOr(true);
      }, 600);


      const timer2 = setTimeout(() => {
        setShowTechnologyButton(true);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer3);
        clearTimeout(timer2);
      };
    }
  };

  const handleFinishGame = () => {
    sessionStorage.setItem("finalScore", score.toString());
    navigate("/p");
  };

  return (
    <div className="relative bg-blue min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="fondo.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      <div className="relative w-full md:w-[70%] lg:w-[60%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
    
        <img
          src="field.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      {showResults ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl w-[80%]">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 font-bentham text-center">Game Results</h2>

            {questions.length > 0 && (
              <>
                <p className="text-2xl md:text-3xl mt-4 text-center">
                  Tuviste el {((score / questions.length) * 100).toFixed(2)}% de aciertos
                </p>

  
              </>
            )}

            {questions.length > 0 && (
              <p className="text-3xl md:text-4xl mt-2 text-center  font-bentham ">
                {((score / questions.length) * 100) < 40
                  ? "Ups! Parece que no eres un fan"
                  : ((score / questions.length) * 100) >= 40 && ((score / questions.length) * 100) < 70
                  ? "Parece que sabes algo pero aún falta"
                  : "¡Eres un experto total en identificar nombres!"}
              </p>
            )}
             <div className="mt-8 w-full flex flex-col items-center">
        <p className="font-bold font-bentham text-black text-4xl sm:text-5xl lg:text-5xl text-center">
          Comparte tus resultados
        </p>

        <div className="flex space-x-4 mt-6 sm:mt-8">
          <a href="#" onClick={shareOnWhatssap} id="email-button">
            <IoLogoWhatsapp size={32} className="text-black hover:text-yellow-500 transition-colors" />
          </a>
          <a href="#" onClick={shareOnInstagram}>
            <IoLogoInstagram size={32} className="text-black hover:text-pink-500 transition-colors" />
          </a>
          <a href="#" onClick={shareOnFacebook}>
            <IoLogoFacebook size={32} className="text-black hover:text-blue-600 transition-colors" />
          </a>
          <a href="#" onClick={shareOnLinkedIn}>
            <IoLogoLinkedin size={32} className="text-black hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </div>
          </div>
        </div>
      ) 

      : (
          <>
           <div className={`flex justify-center z-20 text-center w-full mt-[0%] absolute top-[5%] ${isFlipped ? 'invisible' : ''}`}>
            <h3 className="text-5xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-7xl font-Merriweather text-black">
              {questions[currentQuestion].name}
            </h3>
          </div>



            <div className="w-full h-[30%]">
              <div className="relative w-full h-[100%] flex justify-center absolute bottom-[-10%]">
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

                          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                          
                            <PokemonCard id="next-button" onClick={handleNextQuestion} />
                          </div>
                        )}

            </div>

              <div className="absolute bottom-0 flex flex-col sm:flex-row justify-center items-center z-20 text-center mx-auto gap-4 px-4 w-full">
                {/* Botón de Pokémon */}
                <div className="flex justify-center items-center w-full sm:max-w-[42%] px-2">
                  {showPokemonButton && (
                    <Choice
                      id="choice-pokemon"
                      onClick={() => handleAnswer("Pokemon")}
                    />
                  )}
                </div>

                {/* Texto "or" */}
                {showOr  && (
                <div className="absolute flex justify-center items-center w-full sm:w-auto px-0">
                  <span className="font-bentham uppercase text-black text-md sm:text-xl tracking-wider rounded-md">
                    or
                  </span>
                </div>)}

                {/* Botón de Tecnología */}
                <div className="flex justify-center items-center w-full sm:max-w-[33%] px-2">
                  {showTechnologyButton && (
                    <Choice
                      id="choice-technology"
                      onClick={() => handleAnswer("Technology")}
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
