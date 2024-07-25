import { IconLanguage } from "@tabler/icons-react";

type ILanguageSelector = {
    selectedLanguage: string,
    setSelectedLanguage: (language: string) => void,
    languages: any[],
}

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage, languages, }: ILanguageSelector) => (
    <span
        className="cursor-pointer rounded-full space-x-1 pl-2
   bg-[#000000] flex items-center flex-row"
    >
        <IconLanguage size={20} />
        <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[#000000] flex flex-row rounded-full py-1
       text-white"
        >
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    </span>
);

export default LanguageSelector;
