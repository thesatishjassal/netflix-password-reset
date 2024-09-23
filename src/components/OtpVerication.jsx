import React, { useState, useRef, useEffect } from "react";
import { Button, Divider, Stack } from "rsuite";
import ArrowBackIcon from "@rsuite/icons/ArowBack";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import CheckRoundIcon from "@rsuite/icons/CheckRound";
import WarningRoundIcon from "@rsuite/icons/WarningRound";

const OtpVerification = ({
  showOtpVerification,
  resendPass,
  handleResendClick,
  timeLeft,
  handleBackClick,
  formik,
  onSubmit,
  error,
  touched,
  resetForm,
}) => {
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);
  const otpLength = 6;
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    const newOtp = Array.from(inputRefs.current).map((input) => input.value);
    newOtp[index] = value;

    if (value.length === 1 && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
    if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    const otpValueJoined = newOtp.join("");
    setOtpValue(otpValueJoined);
    if (otpValueJoined.length === otpLength) {
      setOtpError("");
    }
  };

  const handleSubmit = () => {
    if (otpValue.length < otpLength) {
      setOtpError("Please fill all OTP fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (otpValue === "123456") {
        setOtpVerified(true);
        onSubmit({ otp: otpValue });
      } else {
        setOtpVerified(false);
        setOtpError("Invalid OTP.");
      }
      setLoading(false);
      formik.handleSubmit();
    }, 2000);
  };

  useEffect(() => {
    if (resetForm) {
      setOtpValue("");
      setOtpVerified(false);
      setOtpError("");
      setLoading(false);

      inputRefs.current.forEach((input) => {
        if (input) input.value = "";
      });
    }
  }, [resetForm]);

  return (
    <div
      className={`otpverification-container ${
        showOtpVerification ? "fade-in" : "fade-out"
      }`}
      style={{ display: showOtpVerification ? "block" : "none" }}
    >
      <div className="back-arrow" onClick={handleBackClick}>
        <ArrowBackIcon />
      </div>
      <Stack alignItems="center" justifyContent="space-between">
        <div className="content-area">
          <h3 className="main-heading poppins-medium">Verify Email</h3>
          <p className="action-text sub-heading poppins-regular">
            Enter the 6-digit OTP sent to your email to reset your password.
          </p>
        </div>
        <div className="otp_container">
          {timeLeft && !otpVerified > 0 ? timeLeft : <EmailFillIcon />}
        </div>
      </Stack>
      <Divider className="div-25" />
      <div className="form-container otp-container">
        {Array.from({ length: otpLength }).map((_, index) => (
          <input
            key={index}
            type="text"
            className={`form-control ${otpError ? "error-border" : ""}`}
            maxLength="1"
            inputMode="numeric"
            pattern="\d"
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
      </div>
      {otpError && <div className="error-message">{otpError}</div>}
      <Button
        startIcon={otpVerified ? <CheckRoundIcon /> : ""}
        type="submit"
        className={`btn ${otpVerified ? "success-button" : "error-button"}`}
        block
        disabled={loading || otpValue.length < otpLength}
        style={{
          backgroundColor: otpVerified
            ? "#4CAF50"
            : loading || otpValue.length < otpLength
            ? "#b81d24"
            : "#f44336",
          cursor:
            loading || otpValue.length < otpLength ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease-in-out",
        }}
        onClick={handleSubmit}
      >
        {loading ? (
          <div className="netflix-loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        ) : otpVerified ? (
          "OTP Verified"
        ) : (
          "Verify OTP"
        )}
      </Button>
      {resendPass && (
        <p className="refrral-label text-center">
          Did not receive OTP? &nbsp;
          <a href="#" className="cta" onClick={handleResendClick}>
            Resend
          </a>
        </p>
      )}
    </div>
  );
};

export default OtpVerification;
