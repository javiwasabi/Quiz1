import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const ButtonStart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
      <Link to="/question">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-white text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
        >
          START
        </button>
      </Link>
    </div>
  );
};

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
        <span className="relative z-10">NEXT</span>
      </button>
    </div>
  );
};


export const Choice: React.FC<{ onClick: () => void; id: string }> = ({
  onClick,
  id,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto font-bentham">
      <button
        className="bg-white flex items-center justify-center w-80 py-3 px-4 sm:py-4 sm:px-6 md:py-5 md:px-8 lg:py-6 lg:px-10 font-medium uppercase text-black text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl leading-tight rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
        onClick={onClick}
        id={id}
      >
        {id === "choice-pokemon" ? "Pokemon" : "Technology"}
      </button>
    </div>
  );
};





export const ButtonStartp: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-bentham ">
      <Link to="/guess">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-black text-5xl sm:text-4xl  bg-transparent"
          style={{ transform: "rotate(0deg)" }}
        >
          START
        </button>
      </Link>
    </div>
  );
};


export const NextP:React.FC<ButtonNextProps> = ({ onClick, id }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-black text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
          onClick={onClick}
          id={id} 
        >
          NEXT
        </button>

    </div>
  );
};

interface PokemonCardProps {
  onClick: () => void;
  id: string;
}
export const PokemonCard: React.FC<PokemonCardProps> = ({ onClick, id }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sliderRef.current || !handleRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const handleWidth = handleRef.current.offsetWidth;
    const sliderLeft = sliderRef.current.getBoundingClientRect().left;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    let newPosition = clientX - sliderLeft - handleWidth / 2;
    // Limitar el movimiento a un rango más corto
    newPosition = Math.max(0, Math.min(newPosition, sliderWidth - handleWidth));

    setPosition(newPosition);

    // Activar clic cuando se alcanza el final
    if (newPosition >= sliderWidth - handleWidth) {
      onClick();
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setPosition(0);
  };

  const userLanguage = navigator.language || navigator.languages[0];
  const isSpanish = userLanguage.startsWith("es");

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleMove(e);
    const handleGlobalEnd = () => handleEnd();

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMove);
      document.addEventListener("mouseup", handleGlobalEnd);
      document.addEventListener("touchmove", handleGlobalMove);
      document.addEventListener("touchend", handleGlobalEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMove);
      document.removeEventListener("mouseup", handleGlobalEnd);
      document.removeEventListener("touchmove", handleGlobalMove);
      document.removeEventListener("touchend", handleGlobalEnd);
    };
  }, [isDragging, position]);

  return (
    <div
      ref={sliderRef}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "50%", // Hacer el deslizable más corto
        maxWidth: "200px", // Limitar el tamaño máximo
        height: "60px",
        borderRadius: "30px",
        backgroundColor:
          position >= (sliderRef.current?.offsetWidth || 300) - 60
            ? "#4caf50"
            : "#ddd",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
          color: "black",
          fontWeight: "bold",
          zIndex: 100,
        }}
      >
        {isSpanish ? "Desliza para continuar" : "Swipe to continue"}
      </div>

      <div
        ref={handleRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{
          position: "absolute",
          top: "5px",
          left: `${position}px`,
          width: "50px",
          height: "50px",
          cursor: "pointer",
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
