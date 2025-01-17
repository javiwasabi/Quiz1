import React, { useState } from "react";
import { ButtonNext, NextP, Choice } from "../components/buttons";
import { useNavigate } from "react-router-dom";

import "../styles/background.css";
import { CardPoke, CardPok } from "../components/questions";

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
      context: "A mythical Pokémon known for its wish-granting powers.",
      name: "Jirachi",
    },

    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/TensorFlow_logo.svg",
      correctAnswer: "Technology",
      context: "An open-source machine learning framework developed by Google.",
      name: "TensorFlow",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png",
      correctAnswer: "Pokemon",
      context: "An Electric/Ghost-type Pokémon that can possess electronics.",
      name: "Rotom",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/e2/Kubernetes_logo_without_workmark.svg",
      correctAnswer: "Technology",
      context: "A platform for automating deployment, scaling, and operations of applications.",
      name: "Kubernetes",
    },
  

    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png",
      correctAnswer: "Pokemon",
      context: "A Steel/Electric-type Pokémon that can generate magnetic fields.",
      name: "Magnemite",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/Ansible_logo.svg",
      correctAnswer: "Technology",
      context: "A simple IT automation platform used for configuration management.",
      name: "Ansible",
    },
   
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/30/Prometheus_Logo.svg",
      correctAnswer: "Technology",
      context: "An open-source monitoring and alerting toolkit designed for reliability.",
      name: "Prometheus",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/791.png",
      correctAnswer: "Pokemon",
      context: "A Legendary Pokémon known as the Sun incarnation.",
      name: "Solgaleo",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
      correctAnswer: "Pokemon",
      context: "A Legendary Pokémon, said to be the creator of the universe.",
      name: "Arceus",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Terraform_Logo.svg",
      correctAnswer: "Technology",
      context: "A tool for building, changing, and managing infrastructure as code.",
      name: "Terraform",
    },
    {
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png",
      correctAnswer: "Pokemon",
      context: "A Pokémon that represents the balance of the ecosystem.",
      name: "Zygarde",
    },
  ];

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

            <div className="w-full h-[30%]">
              <div className="relative w-full h-[60%] flex justify-center">
                <CardPok
                  imageUrl={questions[currentQuestion].imageUrl}
                  context={questions[currentQuestion].context}
                  score={score}
                  isCorrect={isCorrect}
                  isFlipped={isFlipped}
                  onNext={handleNextQuestion}
                />
              </div>

              
            </div>
            <div className="flex justify-center z-20 text-center w-full mt-[0%]">
                <h3 className="text-3xl font-semibold text-white">{questions[currentQuestion].name}</h3>
              </div>




            {isFlipped && (
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                <NextP id="next-button" onClick={handleNextQuestion} />
              </div>
            )}

            <div className="absolute bottom-0 flex justify-center z-20 text-center mx-0 gap-4 px-4 w-full mt-[10%]">
              <div className=" w-1/2 max-w-[200px] px-[20%] py-0">
                {showPokemonButton && (
                  <Choice
                    id="choice-pokemon"
                    onClick={() => handleAnswer("Pokemon")}
                  />
                )}
              </div>
              <div className=" w-1/2 max-w-[200px] px-[20%] py-0">
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
