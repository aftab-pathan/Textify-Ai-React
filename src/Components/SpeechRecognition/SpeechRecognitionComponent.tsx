import { useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }: any) => {
    const { transcript, listening } = useSpeechRecognition();
    const [micOn, setMicOn] = useState<boolean>(false);


    useEffect(() => {
        setSourceText(transcript);
    }, [transcript, setSourceText]);

    const handleVoiceRecording = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setMicOn(false)
        } else {
            SpeechRecognition.startListening({ continuous: true });
            setMicOn(true)
        }
    };

    return (
        <div>
            <IconMicrophone
                size={22}
                className={`text-gray-400 ${micOn ? "text-yellow-500" : ""}`}
                onClick={handleVoiceRecording}
            />
        </div>
    );
};

export default SpeechRecognitionComponent;
