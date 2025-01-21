import React, { useState } from "react";
import { ButtonNext, NextP, Choice } from "../components/buttons";
import { useNavigate } from "react-router-dom";
import "../styles/poke.css";
import "../styles/background.css";
import { CardPok } from "../components/questions";

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPokemonButton, setShowPokemonButton] = useState(true);
  const [showTechnologyButton, setShowTechnologyButton] = useState(true);

  const navigate = useNavigate();
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
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png",
      correctAnswer: "Pokemon",
      context: {
        en: "A Steel/Electric-type Pokémon that can generate magnetic fields.",
        es: "Un Pokémon de tipo Acero/Eléctrico que puede generar campos magnéticos.",
      },
      name: "Magnemite",
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

      const timer1 = setTimeout(() => {
        setShowPokemonButton(true);
      }, 500);

      const timer2 = setTimeout(() => {
        setShowTechnologyButton(true);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  };

  const handleFinishGame = () => {
    sessionStorage.setItem("finalScore", score.toString());
    navigate("/p");
  };

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full md:w-[70%] lg:w-[60%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-bl from-custom-dark via-custom-dark to-[#ebeaea]"></div>
        {showResults ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 font-Merriweather">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-bentham">Game Results</h2>
            <p className="text-lg md:text-xl">Your score: {score}</p>
            <NextP id="final-button" onClick={handleFinishGame} />
          </div>
        ) : (
          <>
           <div className={`flex justify-center z-20 text-center w-full mt-[0%] absolute top-[25%] ${isFlipped ? 'invisible' : ''}`}>
            <h3 className="text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-semibold text-white">
              {questions[currentQuestion].name}
            </h3>
          </div>



            <div className="w-full h-[30%]">
              <div className="relative w-full h-[60%] flex justify-center absolute bottom-[-40%]">
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

              
            </div>
            



            {isFlipped && (
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                <NextP id="next-button" onClick={handleNextQuestion} />
              </div>
            )}

<div className="absolute bottom-0 flex flex-col sm:flex-row justify-center items-center z-20 text-center mx-auto gap-[10%] px-4 w-full mt-0">
  <div className="w-full sm:w-1/2 max-w-[200px] px-4 absolute bottom-20">
    {showPokemonButton && (
      <Choice
        id="choice-pokemon"
        onClick={() => handleAnswer("Pokemon")}
      />
    )}
  </div>
  <div className="w-full sm:w-1/2 max-w-[200px] px-4 py-0">
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
