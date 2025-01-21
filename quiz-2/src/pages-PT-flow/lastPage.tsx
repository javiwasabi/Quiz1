import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import emailjs from "emailjs-com";
import {
  IoMdMail,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io";

interface ShareData {
  score: string | null;
  message: string;
  image: string | null;
}

const Last: React.FC = () => {
  const [shareData, setShareData] = useState<ShareData>({
    score: null,
    message: "",
    image: null,
  });

  const captureResult = async () => {
    const elementToCapture = document.querySelector(".relative"); 

    if (!elementToCapture) {
      alert("The element to capture was not found. Please check your layout.");
      return;
    }

    try {
      const canvas = await html2canvas(elementToCapture as HTMLElement);
      const imgData = canvas.toDataURL("image/png");
      setShareData((prev) => ({
        ...prev,
        image: imgData,
        message: `I scored ${prev.score} in this app!`,
      }));
    } catch (error) {
      console.error("Error capturing the screenshot:", error);
      alert("An error occurred while capturing the result. Please try again.");
    }
  };

  const shareOnPlatform = async (platform: string) => {
    const { score, message } = shareData;
  
    if (!score) {
      alert("No score available to share. Play the game to generate a score.");
      return;
    }
  
    const encodedMessage = encodeURIComponent(
      `I scored ${score} in this awesome game! 🎮 Check it out here: https://example.com`
    );
  
    switch (platform) {
      case "linkedin":

        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=https://example.com&title=My%20Score&summary=${encodedMessage}`,
          "_blank"
        );
        break;
      case "facebook":

        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=${encodedMessage}`,
          "_blank"
        );
        break;
      case "twitter":

        window.open(
          `https://twitter.com/intent/tweet?text=${encodedMessage}`,
          "_blank"
        );
        break;
      default:
        alert("Unsupported platform.");
    }
  };
  
  
  const uploadImageToServer = async (image: string): Promise<string> => {

    try {
      const response = await fetch("https://your-image-hosting-service.com/upload", {
        method: "POST",
        body: JSON.stringify({ image }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data.publicUrl; 
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  };
  

  const sendEmail = async () => {

    await captureResult();

    const { message, image } = shareData;

    if (!image) {
      alert("Failed to capture the result. Please try again.");
      return;
    }

    emailjs
      .send(
        "your_service_id", 
        "your_template_id", 
        {
          message: message,
          screenshot: image,
        },
        "your_user_id" 
      )
      .then(() => alert("Email sent successfully"))
      .catch(() => alert("Failed to send email"));
  };

  useEffect(() => {

    const storedScore = sessionStorage.getItem("finalScore");
    if (storedScore) {
      setShareData((prev) => ({
        ...prev,
        score: storedScore,
        message: `I scored ${storedScore} in this app!`,
      }));
    }
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <div className="relative w-[70%] h-[80vh] overflow-hidden rounded-lg shadow-xl flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-bl from-custom-dark via-custom-dark to-[#ebeaea]"></div>

        <div className="relative flex flex-col items-center justify-center h-full p-6">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 items-center">
            SCORE: {shareData.score}
          </h1>

          <p className="font-bentham text-white text-3xl sm:text-4xl text-center items-center">
            Share your results
          </p>

          {shareData.image && (
            <div className="mt-4">
              <img
                src={shareData.image}
                alt="Captured result"
                className="rounded-lg w-64 h-auto"
              />
              <p className="text-white text-lg mt-2 text-center">
                Previsualización de tu resultado
              </p>
            </div>
          )}

          <div className="flex space-x-8 mt-8">
            <button onClick={sendEmail}>
              <IoMdMail
                size={40}
                className="text-white hover:text-yellow-500 transition-colors"
              />
            </button>
            <button onClick={() => shareOnPlatform("facebook")}>
              <IoLogoFacebook
                size={40}
                className="text-white hover:text-blue-600 transition-colors"
              />
            </button>
            <button onClick={() => shareOnPlatform("linkedin")}>
              <IoLogoLinkedin
                size={40}
                className="text-white hover:text-blue-700 transition-colors"
              />
            </button>
            <button onClick={() => shareOnPlatform("twitter")}>
              <IoLogoTwitter
                size={40}
                className="text-white hover:text-blue-400 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Last;
