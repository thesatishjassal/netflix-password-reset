import React, { useRef, useEffect } from 'react';

const OtpInput = ({ onOtpVerification }) => {
  const inputRefs = useRef([]);
  const otpLength = 6; // Length of OTP

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const newOtp = Array.from(inputRefs.current).map(input => input.value);
    
    // Update the current input
    newOtp[index] = value;

    // Move to the next input if a digit is entered
    if (value.length === 1 && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
    // Move back to the previous input if the input is cleared
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    // Check if the OTP is fully filled
    if (newOtp.join('').length === otpLength) {
      const otpValue = newOtp.join('');
      const otpVerified = otpValue === '123456'; // Replace with your verification logic
      onOtpVerification(otpVerified, otpValue); // Pass verification state and OTP value to parent
    }
  };

  return (
    <div className="form-container otp-container">
      {Array.from({ length: otpLength }).map((_, index) => (
        <input
          key={index}
          type="text"
          className="form-control"
          maxLength="1"
          inputMode="numeric"
          pattern="\d" // Ensures only numeric input
          ref={el => (inputRefs.current[index] = el)}
          onChange={(event) => handleInputChange(index, event)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
