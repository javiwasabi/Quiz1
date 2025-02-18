import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStart } from "../components/buttons";
import { motion } from "framer-motion";

const Vie: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [isSpanish, setIsSpanish] = useState(true);

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    setIsSpanish(languageToSet === "es");
    i18n.changeLanguage(languageToSet).then(() => {
      console.log(`Idioma inicial configurado a: ${languageToSet}`);
    });
  }, [i18n]);
  const getScaleFactor = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
    
    
      if (width >= 1000 && width <= 1024  && height <= 610) {
        return 0.8; 
      }
    
    };
    
      const [scale, setScale] = useState(getScaleFactor());
      const [resizeFactor, setResizeFactor] = useState(window.innerWidth < 640 ? 0.8 : 1);
    
    useEffect(() => {
      const handleResize = () => {
        setResizeFactor(window.innerWidth < 640 ? 0.8 : 1);
      };
    
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    
    
    useEffect(() => {
      const handleResize = () => {
        setScale(getScaleFactor());
      };
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
    

      
    <div className={`relative w-[92%] sm:w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10`}>
  <img
    src="assets/background-IK.jpg"
    alt="Background"
    className="absolute inset-0 h-[97%] w-full object-cover z-0"
  />
  
  {showDisclaimer && (
    <div className="absolute inset-0 flex items-center justify-center z-20  w-full h-full" style={{
      transform: `scale(${resizeFactor})`,
      transformOrigin: "center",
    }}>
      <div className="border-2 border-black rounded-xl bg-white p-6 shadow-lg text-center max-w-lg w-[100%]">
        <div className="text-center">
          <h2 className="poke-name text-2xl md:text-4xl font-bold mb-4 font-bentham">
            {isSpanish ? "¡Prepárate para el juego y recuerda tener en cuenta lo siguiente 😊!" : "Get ready for the game and keep in mind this 😊!"}
          </h2>
          <p className="poke-name text-lg md:text-2xl mt-2 font-bentham">
            {isSpanish
              ? "En este juego, exploramos a los genios que revolucionaron la tecnología y los criminales más infames de la historia. No buscamos estereotipar ni trivializar sus impactos. Reconocemos el legado de los creadores de sistemas operativos y aclaramos que no existe evidencia que permita identificar a un asesino serial solo por su apariencia. Pon a prueba tu intuición y conocimientos. ¿Podrás distinguir a un inventor de un criminal?"
              : "In this game, we explore the geniuses who revolutionized technology and the most infamous criminals in history. We do not seek to stereotype or trivialize their impacts. We acknowledge the legacy of operating system creators and clarify that there is no evidence to identify a serial killer based solely on appearance. Test your intuition and knowledge. Can you distinguish a technological visionary from a criminal?"}
          </p>
        </div>

        {/* Botón centrado dentro del modal */}
        <div className="flex justify-center mt-6">
          <button
            className="w-[79%] sm:w-[73%] md:w-[73%] h-[4rem] bg-yellow-300 text-black py-1 px-4 shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center transform hover:scale-105 transition duration-300 text-sm sm:text-lg md:text-2xl font-bentham uppercase tracking-wider"
            onClick={() => setShowDisclaimer(false)}
            style={{
              background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            }}
          >
            {isSpanish ? "COMENZAR EL JUEGO" : "START THE GAME"}
          </button>
        </div>
      </div>
    </div>
  )}


        <div className={`absolute top-[12%] text-center z-20 w-[85%] h-[24vh] flex items-center justify-center px-4 bg-transparent  ${showDisclaimer ? "invisible" : ""}`}>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bentham text-black break-words">
            {t("guessText")}
          </p>
        </div>

        <div className={`absolute top-[46%] sm:top-[36%] w-full flex justify-center space-x-8 z-10  ${showDisclaimer ? "invisible" : ""}`}>
          <img
            src="assets/silueta.png"
            alt="Background"
            className="absolute inset-1 sm:left-1/2 transform sm:-translate-x-[50%]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className={`absolute bottom-[12%] left-0 right-0 flex justify-center items-center z-10  ${showDisclaimer ? "invisible" : ""}`}>
            <ButtonStart />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vie;