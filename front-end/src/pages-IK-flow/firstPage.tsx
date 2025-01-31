import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStart } from "../components/buttons";
import { motion } from "framer-motion";


const Vie: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {
      console.log(`Idioma inicial configurado a: ${languageToSet}`);
    });
  }, [i18n]);


  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="relative w-[92%] sm:w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ">
        <img
          src="assets/background-IK.jpg"
          alt="Background"
          className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"  
        />

      <div className="absolute top-[12%] text-center z-20 w-[85%] h-[24vh] flex items-center justify-center px-4 bg-transparent "> 
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bentham text-black break-words">
          {t("guessText")}
        </p>
      </div>


      <div className="absolute top-[46%] sm:top-[36%]  w-full flex justify-center space-x-8 z-10"> 
        <img
          src="assets/silueta.png"
          alt="Background"
          className="absolute inset-1 sm:left-1/2 transform sm:-translate-x-[50%]"
        />
      </div>

      <motion.div       
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }} >

      <div className="absolute bottom-[12%] left-0 right-0 flex justify-center items-center z-10">
        <ButtonStart />
      </div>
      </motion.div>

      </div>
    </div>

  );
};

export default Vie;
