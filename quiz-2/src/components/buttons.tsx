import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/idk.css"; // Asegúrate de importar el archivo CSS
const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");

interface ButtonNextProps {
  onClick?: () => void;
  id?: string; 
}

export const ButtonNext: React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <button
        id={id} 
        className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-gray-800 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bentham rounded-full border-4 transition-all hover:bg-black hover:text-white"
        onClick={onClick}
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10">{isSpanish ? "SIGUIENTE" : "NEXT"}</span>
      </button>
    </div>
  );
};
export const Choice: React.FC<{ 
  onClick: () => void; 
  id: string; 
  disabled: boolean; 
}> = ({ onClick, id, disabled }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto font-bentham">
      <button
        className={`bg-white flex items-center justify-center w-auto min-w-[200px] max-w-full py-2 px-4 sm:py-3 sm:px-6 font-medium uppercase text-black text-xl sm:text-2xl leading-tight rounded-full transition-shadow duration-300 h-auto ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
        }`}
        onClick={!disabled ? onClick : undefined}
        id={id}
        disabled={disabled}
        style={{
          boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
        }}
      >
        {id === "choice-pokemon" ? "Pokémon" : isSpanish ? "Tecnología" : "Technology"}
      </button>
    </div>
  );
};

export const ButtonStartp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[9%] w-full font-bentham">
      <Link to="/guess">
        <button
          className="bg-white flex items-center justify-center w-[100%] py-2 px-4 sm:py-2 sm:px-6 font-medium uppercase text-black text-xl sm:text-2xl leading-tight rounded-full transition-shadow duration-300"
          style={{
            boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
            alt="Pokeball"
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain z-10 mr-2"
          />
          {isSpanish ? "INICIAR" : "START"}
        </button>
      </Link>
    </div>
  );
};

export const NextP: React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[0%] w-full font-bentham">
      <button
        className="bg-white flex items-center justify-center w-auto min-w-[100px] max-w-[90%] py-2 px-4 sm:py-3 sm:px-6 font-medium uppercase text-black text-xl sm:text-xl leading-tight rounded-full transition-shadow duration-300 h-auto"
        style={{
          boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
        }}
        
        onClick={onClick}
        id={id}
        aria-label="Next Button"
      >

        <span className="mr-4  z-10">{isSpanish ? "SIGUIENTE" : "NEXT"}</span>
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
            alt="Pokeball"
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain z-10 mr-2"
          />
      </button>
    </div>
  );
};

interface PokemonCardProps {
  onClick: () => void;
  id: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ onClick, id }) => {
  // Función para manejar el clic en el ícono de la Pokébola
  const handleClick = () => {
    onClick();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "50%",
        maxWidth: "200px",
        height: "60px",
        borderRadius: "30px",
        backgroundColor: "#ddd",
        margin: "0 auto",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <div
        style={{
          fontSize: "16px",
          color: "black",
          fontWeight: "bold",
          zIndex: 100,
          marginBottom: "10px",
        }}
      >
        {isSpanish ? "Haz clic para continuar" : "Click to continue"}
      </div>

      <div
        style={{
          width: "50px",
          height: "50px",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
          alt="Pokeball"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};



export const Pokeb = ({ text }: { text: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`pokeb ${isOpen ? "open" : ""}`}>
            <button onClick={() => setIsOpen(!isOpen)}></button>
            <article>
                <p>{text}</p>
            </article>
        </div>
    );
};

