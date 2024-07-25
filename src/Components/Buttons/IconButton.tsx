
type IIconButton = {
    Icon: any,
    onClick: () => void
}

const IconButton = ({ Icon, onClick }: IIconButton) => (
    <span
        className="cursor-pointer flex items-center space-x-2"
        onClick={onClick}
    >
        <Icon size={22} />
    </span>
);

export default IconButton;
