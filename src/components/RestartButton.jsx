export default function RestartButton({ ...props }) {
    return <button
        className='restart-button button-box-shadow gray-button-style'
        {...props}
    >
        <span className="material-symbols-outlined">restart_alt</span>
    </button>
}