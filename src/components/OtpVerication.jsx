import React, { useState } from "react";
import { Button, Divider, Stack } from "rsuite";
import ArrowBackIcon from "@rsuite/icons/ArowBack";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import OtpInput from "./OtpInput";
import CheckRoundIcon from "@rsuite/icons/CheckRound";

const OtpVerification = ({
  showOtpVerification,
  resendPass,
  handleResendClick,
  timeLeft,
  handleBackClick,
}) => {
  const [otpVerified, setOtpVerified] = useState(false);
 
  const handleOtpVerification = (otpVerified, otp) => {
    if (otpVerified) {
      setOtpVerified(true);
      console.log("OTP Verified:", otp); // Handle successful verification
    } else {
      console.log("Incorrect OTP:", otp); // Handle incorrect OTP
      setOtpVerified(false);
    }
  };

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
      <OtpInput onOtpVerification={handleOtpVerification} />
      <Button
        startIcon={otpVerified ? <CheckRoundIcon /> : ""}
        type="submit"
        className={`btn ${otpVerified ? "success-button" : ""}`}
        block
        style={{
          backgroundColor: otpVerified ? "#4CAF50" : "",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        {otpVerified ? "OTP Verified" : "Verify OTP"}
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
