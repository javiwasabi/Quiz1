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

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {isSpanish ? "Descargo de responsabilidad" : "Disclaimer"}
            </h2>
            <p className="mb-4">
              {isSpanish
                ? "En este juego, exploramos dos mundos opuestos: los genios que revolucionaron la tecnología y los criminales más infames de la historia. No buscamos estereotipar ni trivializar sus impactos. Reconocemos el legado de los creadores de sistemas operativos y aclaramos que no existe evidencia científica que permita identificar a un asesino serial solo por su apariencia. Pon a prueba tu intuición y conocimientos. ¿Podrás distinguir a un visionario tecnológico de un criminal?"
                : "In this game, we explore two opposing worlds: the geniuses who revolutionized technology and the most infamous criminals in history. We do not seek to stereotype or trivialize their impacts. We acknowledge the legacy of operating system creators and clarify that there is no scientific evidence to identify a serial killer based solely on appearance. Test your intuition and knowledge. Can you distinguish a technological visionary from a criminal?"}
            </p>
            <button
              className="bg-black text-white text-center px-4 py-2 rounded-lg"
              onClick={() => setShowDisclaimer(false)}
            >
              {isSpanish ? "Acepto y deseo continuar" : "I accept and wish to continue"}
            </button>
          </div>
        </div>
      )}
      
      <div className={`relative w-[92%] sm:w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ${showDisclaimer ? "opacity-50" : "opacity-100"}`}>
        <img
          src="assets/background-IK.jpg"
          alt="Background"
          className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"
        />

        <div className="absolute top-[12%] text-center z-20 w-[85%] h-[24vh] flex items-center justify-center px-4 bg-transparent">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bentham text-black break-words">
            {t("guessText")}
          </p>
        </div>

        <div className="absolute top-[46%] sm:top-[36%] w-full flex justify-center space-x-8 z-10">
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
          <div className="absolute bottom-[12%] left-0 right-0 flex justify-center items-center z-10">
            <ButtonStart />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vie;