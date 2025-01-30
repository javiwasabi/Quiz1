import React, { useState, useEffect } from "react";
import '../styles/background.css';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"


export const ButtonStart: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {});
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {});
  };

  return (
    <div className="flex flex-col items-center justify-center h-[30%] w-full font-frijole px-4 items-center">
      <Link to="/question">
        <button
          className="relative w-full sm:w-[43%] md:w-[100%] h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center transform hover:scale-105 transition duration-300 mb-2 sm:mb-0"
          style={{
            background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transform: 'rotate(0deg)',
          }}
        >
          <span className="block text-sm sm:text-2xl md:text-3xl font-bentham uppercase tracking-wider text-left">
            {t("start")}
          </span>
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
  const { t, i18n } = useTranslation();
      
        
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
  return (
    <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
      <button
        id={id} 
        className="relative w-full sm:w-[63%] md:w-[100%] h-[4rem] bg-yellow-300 text-black py-2 px-4 text-center shadow-lg rounded-lg border-4 border-yellow-600 flex justify-center items-center  transition duration-300 mb-2 sm:mb-0"
          style={{
            background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transform: 'rotate(0deg)',
          }}
        onClick={onClick}
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"></div>
        <span className="block text-sm sm:text-2xl md:text-2xl font-bentham uppercase tracking-wider text-left"> {t("nextstep")}</span>
      </button>
    </div>
  );
};


export const NextP:React.FC<ButtonNextProps> = ({ onClick, id }) => {
   const { t, i18n } = useTranslation();
      
        
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
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-10 px-8 sm:py-20 sm:px-10 font-medium uppercase text-black text-3xl sm:text-2xl bg-transparent"
          style={{ transform: "rotate(0deg)" }}
          onClick={onClick}
          id={id} 
        >
          {t("nextstep")}
        </button>

    </div>
  );
};

