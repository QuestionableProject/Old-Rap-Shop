export default function OptionsSVG({onToggle}) {
    return (
        <svg onClick={onToggle} height={50}  x="0px" y="0px" viewBox="0 0 32 32">
            <circle fill="none" stroke="white" cx="23" cy="7" r="3" />
            <line fill="none" stroke="white" x1="3" y1="7" x2="20" y2="7" />
            <line fill="none" stroke="white" x1="29" y1="7" x2="26" y2="7" />
            <circle fill="none" stroke="white" cx="12" cy="16" r="3" />
            <line fill="none" stroke="white" x1="3" y1="16" x2="9" y2="16" />
            <line fill="none" stroke="white" x1="29" y1="16" x2="15" y2="16" />
            <circle fill="none" stroke="white" cx="23" cy="25" r="3" />
            <line fill="none" stroke="white" x1="3" y1="25" x2="20" y2="25" />
            <line fill="none" stroke="white" x1="29" y1="25" x2="26" y2="25" />
        </svg>

    )
}