import React, { useState, useRef } from 'react';
// import "./style.css"

const OtpInput = ({ otp, setOtp }) => {
    const inputRefs = useRef([]);

    const handleChange = (event, index) => {
        const value = event.target.value;
        if (isNaN(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (index < inputRefs.current.length - 1 && value !== '') {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='flex flex-row justify-center items-center'>
            {otp.map((value, index) => (
                <input
                    className='ease transition-all font-semibold bg-blue-100 focus:border-blue-600 w-12 h-12 m-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(ref) => inputRefs.current[index] = ref}
                />
            ))}
        </div>
    );
};

export default OtpInput;