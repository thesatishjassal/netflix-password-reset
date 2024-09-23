import React, { useRef } from "react";

const OtpInput = ({ onOtpVerification, error, touched }) => {
  const inputRefs = useRef([]);
  const otpLength = 6; // Length of OTP

  const handleInputChange = (index, event, error) => {
    console.log(error);
    
    const value = event.target.value;
    const newOtp = Array.from(inputRefs.current).map((input) => input.value);
    newOtp[index] = value;

    if (value.length === 1 && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (newOtp.join("").length === otpLength) {
      const otpValue = newOtp.join("");
      const otpVerified = !error && otpValue === "123456";
      onOtpVerification(otpVerified, otpValue);
    }
  };

  return (
    <>
      <div className="form-container otp-container">
        {Array.from({ length: otpLength }).map((_, index) => (
          <input
            key={index}
            type="text"
            className={`form-control ${error && touched ? "error-border" : ""}`} // Add error class
            maxLength="1"
            inputMode="numeric"
            pattern="\d" // Ensures only numeric input
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
      </div>
      {error && touched && <div className="error-message">{error}</div>}{" "}
    </>
  );
};

export default OtpInput;
