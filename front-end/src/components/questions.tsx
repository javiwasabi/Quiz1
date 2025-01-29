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
        <div className="w-full aspect-[4/3] flex items-center justify-center rounded-lg bg-black">
          <img
            src={imageUrl}
            alt="Polaroid"
            className="w-full h-full object-contain"
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        </div>
        <p className="mt-4 text-xl sm:text-xl md:text-3xl font-bold text-black font-bentham text-center leading-tight">
        {t("textp")}
        </p>
      </div>
      <div
  className={`relative flex flex-col items-center justify-center rounded-lg 
              p-4 w-[250px] h-[250px] sm:w-[400px] sm:h-[250px] 
              ${!isFlipped ? 'bg-transparent' : 'bg-white'}`}
  style={{
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
>
  {isFlipped && (
    <div className="absolute inset-0 flex justify-center items-left">
      <h1
        className={`absolute top-[7%] text-xl sm:text-xl md:text-3xl font-light font-Merriweather text-black ${isCorrect ? 'text-black' : 'text-black'} w-[70%] max-w-[300px] text-center`}
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

  {/* Texto animado */}
  <p className="mt-4 text-xl sm:text-xl md:text-2xl font-light font-Merriweather text-center flex-grow flex items-center justify-center">
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




