import React, { useState } from "react";
import { ButtonStartp } from "../components/buttons";
import "../styles/background.css";

const First: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Detectar el idioma del navegador
  const userLanguage = navigator.language || navigator.languages[0];
  const isSpanish = userLanguage.startsWith("es");

  const handleClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="relative bg-blue min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="fondo.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative w-[90%] md:w-[70%] lg:w-[60%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
        <img
          src="field.jpg"
          alt="Field"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
          <h1 className="text-4xl md:text-5xl text-black font-bentham drop-shadow-lg">
            {isSpanish ? (
              <>
                ¿Eres capaz de identificar el <span className="font-extrabold">nombre</span> de un Pokémon?
              </>
            ) : (
              <>
                Are you able to identify the <span className="font-extrabold">name</span> of a Pokémon?
              </>
            )}
          </h1>
        </div>

        {/* Pokeball interactiva */}
        <div
          className="relative w-48 h-48 ball absolute bottom-[-10%] cursor-pointer"
          onClick={handleClick}
        >
          <div className="inside"></div>
          <div className="center"></div>
          <div className="absolute bottom-[0%] left-0 right-0 h-1/2 rounded-b-full bg-transparent"></div>
        </div>

        {/* Contenido oculto */}
        <div
          className={`absolute transition-transform duration-500 ${
            isRevealed
              ? "-translate-y-48 opacity-100"
              : "translate-y-0 opacity-0"
          }`}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-6xl font-extrabold">
            ?
          </div>
        </div>

        {/* Botón Start */}
        <div className="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
          <ButtonStartp />
        </div>
      </div>
    </div>
  );
};

export default First;
