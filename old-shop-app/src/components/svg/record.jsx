export default function RecordSVG({onToggle}) {
    return (
        <svg onClick={onToggle} height={50} x="0px" y="0px" viewBox="0 0 32 32" >
            <circle fill="none" stroke="white" cx="16" cy="16" r="13" />
            <circle fill="none" stroke="white" cx="16" cy="16" r="4" />
            <circle fill="none" stroke="white" cx="16" cy="16" r="0" />
            <path fill="none" stroke="white" d="M16,6C10.5,6,6,10.5,6,16" />
            <path fill="none" stroke="white" d="M16,9c-3.9,0-7,3.1-7,7" />
        </svg>

    )
}