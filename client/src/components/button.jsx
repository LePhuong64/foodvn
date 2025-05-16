import React, { memo } from 'react'

const Button = ({ text, textColor, bgColor, onClick, fullWidth, px }) => {
    return (
        <button
            type='button'
            className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:opacity-80 active:opacity-60 transition-all duration-150 flex items-center justify-center gap-1`}
            onClick={onClick}
        >
            <span> {text}</span>
        </button>
    )
}

export default memo(Button);