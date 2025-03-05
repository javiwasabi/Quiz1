import React, { useState, useEffect } from "react";
import { ButtonStartp } from "../components/buttons";
import "../styles/background.css";
import { motion } from "framer-motion";

const First: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const userLanguage = navigator.language || navigator.languages[0];
  const isSpanish = userLanguage.startsWith("es");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="relative bg-blue min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/tecnologiaofantasia/fondo.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative w-[90%] md:w-[70%] lg:w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
        <img
         src="/tecnologiaofantasia/assets/fondoo.webp"
          alt="Background"
           className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute top-[5%] sm:top-[15%] left-[50%] transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] text-center  nesthub:top-[3%]">
          <motion.div
            className="relative bg-white  shadow-xl p-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              boxShadow: "0px 8px 8px -2px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-black font-bentham leading-tight w-full">
              {isSpanish ? (
                <>
                  ¿Puedes distinguir la diferencia entre tecnologías y personajes de fantasía?
                </>
              ) : (
                <>
                  Can you spot the difference between Digital Technologies and Fantasy Characters?
                </>
              )}
            </h1>
          </motion.div>
        </div>


        <div
          className="relative w-[20vw] sm:w-[15vw] md:w-[12vw] lg:w-[10vw] h-[20vw] sm:h-[15vw] md:h-[12vw] lg:h-[10vw]  fixed top-[2%]  cursor-pointer"
          onClick={handleClick}
        >
        
         
        </div>


        <div
          className={`absolute transition-transform duration-500 ${
            isRevealed
              ? "-translate-y-48 opacity-100"
              : "translate-y-0 opacity-0"
          }`}
        ></div>


        <div className="absolute top-[91%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center">
          <ButtonStartp />
        </div>
      </div>
    </div>
  );
};

export default First;