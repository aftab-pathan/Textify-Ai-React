import { ChangeEvent, useState } from "react";
import useTranslate from "../hooks/useTranslate";
import { rtfToText } from "../utils/rtfToText";
import TextArea from "../Components/Inputs/TextArea";
import SpeechRecognitionComponent from "../Components/SpeechRecognition/SpeechRecognitionComponent";
import { IconCopy, IconCopyPlusFilled, IconStar, IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled, IconVolume } from "@tabler/icons-react";
import FileUpload from "../Components/Inputs/FileUpload";
import LinkPaste from "../Components/Inputs/LinkPaste";
import LanguageSelector from "../Components/Inputs/LanguageSelector";
import SvgDecorations from "../Components/common/SvgDecorations";
import CategoryLinks from "../Components/common/CategoryLinks";

const Home: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [disLike, setDisLike] = useState<boolean>(false);
  const [audioOn, setAudioOn] = useState<string>("");
  const [languages] = useState<string[]>([
    "Hindi",
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = async(text: string,type:string) => {
    setAudioOn(type)
    const utterance = new SpeechSynthesisUtterance(text);
    await window.speechSynthesis.speak(utterance);
    setAudioOn("")
  };

  return (
    <div className="w-full bg-black bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold  text-neutral-200">
              Textify<span className="text-[#f87315]">Speak</span>
            </h1>

            <p className="mt-3 text-neutral-400">
              TextifySpeak: Bridging Voices, Connecting Worlds.
            </p>

            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(sourceText,"source")}
                        className={audioOn==="source" ? "text-yellow-500" : ""}
                      />
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => { }}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(targetText,"target")}
                        className={audioOn==="target" ? "text-yellow-500" : ""}
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      {copied ? <IconCopyPlusFilled size={22} onClick={handleCopyToClipboard} /> : <IconCopy size={22} onClick={handleCopyToClipboard} /> }
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      {like ? <IconThumbUpFilled size={22} onClick={() => setLike(false)}/> : <IconThumbUp size={22} onClick={() => setLike(true)} />}
                      {disLike ? <IconThumbDownFilled size={22} onClick={() => setDisLike(false)}/> : <IconThumbDown size={22} onClick={() => setDisLike(true)} />}
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <SvgDecorations />
            </div>

            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;