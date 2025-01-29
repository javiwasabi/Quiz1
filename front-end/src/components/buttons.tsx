import React, { useState, useEffect } from "react";

import '../styles/background.css';
import ReactCardFlip from "react-card-flip";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

export const ButtonStart: React.FC = () => {
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
    <div className="flex flex-col items-center justify-center h-[30%] w-full font-frijole px-4 items-center">
      <Link to="/question">
        <button
          className="relative -top-1 -left-1 bg-gray-800 py-6 px-6 sm:py-10 sm:px-8 lg:py-12 lg:px-10 font-medium uppercase text-white text-2xl sm:text-3xl lg:text-4xl bg-transparent w-full sm:w-auto"
          style={{ transform: "rotate(0deg)" }}
        >
           {t("start")}
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
        className="relative px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 lg:px-12 lg:py-6 bg-gray-800 text-black text-xl sm:text-xl md:text-3xl  font-bentham rounded-full border-4 transition-all hover:bg-black "
        style={{
          background: 'linear-gradient(145deg, #f8e9a1, #d8c880)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
          transform: 'rotate(-2deg)',
        }}
        onClick={onClick}
      >
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10"> {t("nextstep")}</span>
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


export const Choice: React.FC<{ onClick: () => void; id: string }> = ({
  onClick,
  id,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[10%] w-[90%] font-title">
      <button
        className=" bg-gray-800 py-10 px-8 sm:py-14 sm:px-10 md:py-16 md:px-12 lg:py-18 lg:px-16 font-medium uppercase text-white text-xl sm:text-xl md:text-2xl font-light bg-transparent"
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
    <div className="flex flex-col items-center justify-center h-[10%] w-full font-title">
      <Link to="/guess">
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
