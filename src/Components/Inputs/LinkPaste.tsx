import { IconLink } from "@tabler/icons-react";

type ILinkPaset = {
    handleLinkPaste: (...args:any) => void
}

const LinkPaste = ({ handleLinkPaste }: ILinkPaset) => (
    <label htmlFor="link-input" className="cursor-pointer">
        <IconLink size={21} />
        <input
            type="text"
            id="link-input"
            className="hidden"
            onChange={handleLinkPaste}
        />
    </label>
);

export default LinkPaste;
