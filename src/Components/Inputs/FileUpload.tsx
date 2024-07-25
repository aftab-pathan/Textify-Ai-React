import { IconPaperclip } from "@tabler/icons-react";
type IFileUpload = {
    handleFileUpload: (...args:any) => void
}

const FileUpload = ({ handleFileUpload }: IFileUpload) => (
    <label htmlFor="file-upload" className="cursor-pointer">
        <IconPaperclip size={21} />
        <input
            type="file"
            id="file-upload"
            onChange={handleFileUpload}
            className="hidden"
        />
    </label>
);

export default FileUpload;
