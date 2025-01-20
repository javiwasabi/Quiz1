import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { IoMdMail, IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io";
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';

const Last: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [score, setScore] = useState<string | null>('');
  const [checklistOptions, setChecklistOptions] = useState<{ id: number, label: string, checked: boolean }[]>([
    { id: 1, label: 'Would you like to receive information about x?', checked: false },
    { id: 2, label: 'Send results to email', checked: false }
  ]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null); 
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const languageToSet = browserLanguage.startsWith("es") ? "es" : "en";
    i18n.changeLanguage(languageToSet).then(() => {
      console.log(`Idioma inicial configurado a: ${languageToSet}`);
    });
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      console.log(`Idioma cambiado a: ${lng}`);
    });
  };

  useEffect(() => {
    const storedScore = sessionStorage.getItem('finalScore');
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  const handleChecklistChange = (id: number) => {
    setChecklistOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!userEmail.includes('@')) {
      setError('The email address must contain an "@" symbol.');
      return;
    }

    if (!score) {
      setError('Score is missing.');
      return;
    }

    // Enviar correo usando EmailJS
    const templateParams = {
      to_email: userEmail,
      subject: "Your Score",
      message: `You achieved a score of ${score} in this app!`
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully', response);
        setSuccess(true);
      })
      .catch((error) => {
        console.log('Email sending failed', error);
        setError('Failed to send email.');
      });
  };

  const handleClick = () => {
    html2canvas(document.body).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      setCapturedImage(imgData); 

 
      setShowInput(true);
    });
  };

  const shareOnFacebook = () => {
    const message = `I scored ${score} in this app!`; 
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.example.com&quote=${encodeURIComponent(message)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const message = `I scored ${score} in this app!`; // Traducción en inglés o español
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://www.example.com&title=${encodeURIComponent(message)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareOnInstagram = () => {
    const message = `I scored ${score} in this app!`; // Traducción en inglés o español
    const instagramUrl = `https://www.instagram.com/create/style/?text=${encodeURIComponent(message)}`;
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="relative w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex flex-col items-center justify-center">
        <img
          src="assets/background-IK.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative flex flex-col items-center justify-center h-[60%] w-[80%] bg-black bg-opacity-30 p-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 items-center">
            {t("result")}: {score}
          </h1>
          {success && <p className="text-green-400 mb-4">Data sent successfully!</p>}
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <p className="font-bentham text-white text-3xl sm:text-4xl text-center items-center">{t("share")}</p>

          <div className="flex space-x-8 mt-8">
            <a 
              href="#"
              onClick={handleClick} 
              id='email-buttton'
            >
              <IoMdMail size={40} className="text-white hover:text-yellow-500 transition-colors" />
            </a>
            <a href="#" onClick={shareOnInstagram}>
              <IoLogoInstagram size={40} className="text-white hover:text-pink-500 transition-colors" />
            </a>
            <a href="#" onClick={shareOnFacebook}>
              <IoLogoFacebook size={40} className="text-white hover:text-blue-600 transition-colors" />
            </a>
            <a href="#" onClick={shareOnLinkedIn}>
              <IoLogoLinkedin size={40} className="text-white hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Mostrar el input solo cuando showInput es true */}
      {showInput && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4">Your Score and Image</h2>
          <input
            type="text"
            value={`Score: ${score}\nImage: `}
            readOnly
            className="mb-4 p-2 border rounded-md w-full"
          />
          {capturedImage && (
            <img src={capturedImage} alt="Captured score" className="mt-4 max-w-full h-auto rounded-lg" />
          )}
          <p className="mt-4">{t("shareYourScore")}</p>
        </div>
      )}

      {t("changeLanguageButton") && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={() => changeLanguage("en")}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            {t("englishButton")}
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-green-600"
          >
            {t("spanishButton")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Last;
