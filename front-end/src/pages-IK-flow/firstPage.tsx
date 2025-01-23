import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStart } from "../components/buttons";
import { Card, PolaroidPhoto } from "../components/questions";
const Vie: React.FC = () => {
  const { t, i18n } = useTranslation();

  
  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {
      console.log(`Idioma inicial configurado a: ${languageToSet}`);
    });
  }, [i18n]);

  console.log("Idiomas disponibles:", i18n.languages);
  console.log("Idioma actual:", i18n.language);
  console.log("Traducción para 'guessText':", t("guessText"));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(`Idioma cambiado a: ${lng}`);
      console.log("Texto traducido después del cambio:", t("guessText"));
    });
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="relative w-[80%] h-[90vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center z-10 absolute ">
    <img
      src="assets/background-IK.jpg"
      alt="Background"
      className="absolute inset-0 h-[97%] justify-center items-center w-full object-cover z-0"
    />

        <div className="absolute top-[11%] text-center z-10 w-[95%] px-4">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-frijole text-black break-words">
            {t("guessText")}
          </p>
        </div>



        <div className="absolute top-[46%] w-full flex justify-center space-x-8 z-9">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/SVG_Human_Silhouette.svg/640px-SVG_Human_Silhouette.svg.png"
          alt="Background"
          className="absolute inset-1"
        />

         
        </div>


        <div className="absolute bottom-[10%] left-4 right-0 flex justify-center items-center">
        <ButtonStart />
      </div>

      </div>

   
   
  </div>
  
  );
};

export default Vie;
