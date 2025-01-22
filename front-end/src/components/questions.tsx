import React, { useState, useEffect } from "react";
import { NextP } from "./buttons";
import '../styles/background.css';
import ReactCardFlip from "react-card-flip";
import { useTranslation } from "react-i18next";



interface CardProps {
  imageUrl: string;
  context: string;
  isFlipped: boolean;
  onAnswer: (answer: string) => void; 
  isCorrect: boolean
}

export const Card: React.FC<CardProps> = ({
  imageUrl,
  context,
  isFlipped,
  onAnswer, 
  isCorrect
}) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const [isSpanish, setIsSpanish] = useState(false);

  useEffect(() => {
    const userLanguage = navigator.language || navigator.languages[0];
    setIsSpanish(userLanguage.startsWith("es"));
  }, []);
    
  
    
      
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
  useEffect(() => {
    setTypedText("");
    setIndex(0);
  }, [context]);

  useEffect(() => {
    if (isFlipped && index < context.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + context[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [index, context, isFlipped]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

      <div
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 w-[100%] items-center justify-center cursor-pointer"
        onClick={() => onAnswer("Inventor")} 
      >
        <div className="w-full aspect-[4/3] bg-white flex items-center justify-center rounded-lg">
          <img
            src={imageUrl}
            alt="Polaroid"
            className="w-full h-full object-contain"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </div>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black font-bentham text-center leading-tight">
        {t("textp")}
        </p>
      </div>
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
      {isFlipped && (
      <div className="relative w-full h-[50%] flex justify-center items-center absolute bottom-[-10%]">
        <h1
          className={`absolute bottom-[-60%] text-xl sm:text-xl md:text-4xl font-bentham text-black ${isCorrect ? 'text-black' : 'text-black'} transition-all duration-500 w-[70%] max-w-[300px] text-center`}
        >
          {isSpanish
            ? isCorrect
              ? "¡Correcto!"
              : "¡Incorrecto!"
            : isCorrect
            ? "Correct!"
            : "Incorrect!"
          }
        </h1>
      </div>
    )}
        <p className="mt-4 text-xl sm:text-xl md:text-4xl font-light font-Merriweather text-center">
          {typedText}
        </p>
      </div>
    </ReactCardFlip>
  );
};



export const PolaroidPhoto: React.FC = () => {
  return (
    <div className="flex flex-col w-[90%] sm:w-[90%] md:w-[90%] lg:w-[90%] mx-auto mt-4">
      <div
        className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8"
        style={{ transform: "rotate(-11deg)" }}
      >

        <div className="w-full aspect-[3/4] bg-black flex items-center justify-center rounded-lg">
          <p className="text-black"></p>
        </div>

        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white font-bentham">
          Guess
        </p>
      </div>
    </div>
  );
};





interface CardPropsp {
  imageUrl: string; // URL de la imagen a mostrar
  context: string; // Nombre de la tecnología o Pokémon
  isCorrect: boolean; // Si la respuesta fue correcta
  isFlipped: boolean; // Estado de la tarjeta (adivinando o revelada)
  score: number; // Puntaje actual
  onNext: () => void; // Callback para pasar a la siguiente tarjeta
}
export const CardPoke: React.FC<CardPropsp> = ({
  imageUrl,
  context,
  isCorrect,
  isFlipped,
  score,
  onNext,
}) => {
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTypedText("");
    setIndex(0);
  }, [context]);

  useEffect(() => {
    if (isFlipped && index < context.length) {
      const timeoutId = setTimeout(() => {
        setTypedText((prev) => prev + context[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [index, context, isFlipped]);

  return (
    <div
      className={`relative flex flex-col items-center bg-white shadow-lg rounded-lg p-0 sm:p-6 md:p-8 transition-transform duration-500 ease-in-out`}
      style={{
        transform: isFlipped ? "rotate(0deg)" : "rotateY(180deg)",
        width: "60%", 
        height: "90%", 
      }}
    >
      <div
        className={`w-full h-full absolute flex items-center justify-center text-center bg-white rounded-lg ${isFlipped ? "hidden" : "block"}`}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-4xl sm:text-6xl font-extrabold">
          ?
        </div>
        <img
          src={"https://i.pinimg.com/236x/bb/65/ac/bb65acb8eced7c4a1fbce90916211e80.jpg"}
          className="w-full h-full  mb-4"
        />
      </div>
  
      <div
        className={`w-full h-full absolute flex flex-col items-center justify-center text-center bg-white rounded-lg transform ${isFlipped ? "block" : "hidden"}`}
      >
        <img
          src={imageUrl}
          alt={context}
          className="w-full h-full object-cover mb-4"
        />
        <p className="text-base sm:text-lg md:text-xl text-center px-4">{typedText}</p>
      </div>
    </div>
  );
  
};



export const CardPok: React.FC<CardPropsp> = ({
  imageUrl,
  context,
  isCorrect,
  isFlipped,
  score,
  onNext,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Sincroniza el estado interno con isFlipped
  useEffect(() => {
    setIsRevealed(isFlipped);
  }, [isFlipped]);

  return (
    <div className="flex absolute bottom-0">
      <div className="relative flex flex-col items-center">
        <div
          className="relative w-48 h-48 ball"
          style={{
            transform: isRevealed ? "rotate(0deg)" : "rotateY(180deg)",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div className="inside"></div>
          <div className="center"></div>
          <div className="absolute bottom-[0%] left-0 right-0 h-1/2 bg-white rounded-b-full border-t-4 border-black shadow-2xl"></div>
        </div>

        {/* Pokémon */}
        <div
          className={`absolute transition-transform duration-500 ${
            isRevealed ? "-translate-y-[100%] opacity-100" : "translate-y-0 opacity-0"
          }`}
        >
          <img
            src={imageUrl}
            alt=""
            className="w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
};
