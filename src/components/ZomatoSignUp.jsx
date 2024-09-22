import { Panel } from "rsuite";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Divider, Stack } from "rsuite";
import FloatingLabelInput from "./FloatingLabelInput";
import { RegisterSchema } from "../Schema/RegisterSchema";
import "rsuite/dist/rsuite.min.css";
import OtpVerification from "../components/OtpVerication";
import { Tabs } from "rsuite";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import MessageIcon from "@rsuite/icons/Message";
import { SelectPicker } from "rsuite";
import { countryData } from "../components/ContryData";
import * as Yup from "yup";

const ZomatoSignUp = () => {
  const [signupData, setSignupData] = useState(null); // State to store signup form data
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendPass, setResendPass] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [actionText, setActionText] = useState("Mail ME OTP");
  const [activeTab, setActiveTab] = useState("1");

  const validationSchema = Yup.object().shape({
    email: activeTab === "1" ? Yup.string().email('Invalid email').required('Email is required') : Yup.string(),
    phoneNumber: activeTab === "3" ? Yup.string().required('Phone number is required') : Yup.string(),
    countryCode: activeTab === "3" ? Yup.string().required('Country code is required') : Yup.string(),
  });
  
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      countryCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      if (!showOtpVerification) {
        setSignupData(values); // Store signup data before showing OTP verification
        setShowOtpVerification(true);
        setTimeLeft(60);
        setResendPass(false);
      }
    },
  });

  const styles = { width: "100%", display: "block", marginBottom: 10 };

  const CodeData = countryData.map((country, index) => ({
    label: country.country,
    value: country.code,
    key: `${country.code}-${index}`, //
  }));

  const resendOtp = () => {
    setResendPass(false);
    console.log("OTP resent");
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setResendPass(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendClick = () => {
    resendOtp();
    setTimeLeft(60);
    setResendPass(false);
  };

  const handleBackClick = () => {
    setShowOtpVerification(false);
  };

  const handleEmailTab = () => {
    setActiveTab("1");
  };

  const handlePhoneTab = () => {
    setActiveTab("3");
  };


  const handleOtpSubmit = (otpValues) => {
    const combinedData = {
      ...signupData, // Include the name and email from the signup form
      otp: otpValues.otp, // Include the OTP value
    };
    console.log("Full JSON Data for API:", combinedData);
    setTimeLeft(0);
    // Now send combinedData to your API
    // Example API call:,
    // fetch('your-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(combinedData)
    // });
  };

  return (
    <Panel shaded bordered bodyFill className="auth_card">
      <div className="panel-body">
        <div className="auth_container">
          <form onSubmit={formik.handleSubmit}>
            {!showOtpVerification && (
              <div className="SingInForm-container fade-in">
                <Stack alignItems="center" justifyContent="space-between">
                  <div>
                    <h3 className="main-heading poppins-medium">
                      Reset your password
                    </h3>
                    <p className="sub-heading poppins-medium mb-4">
                      Choose how do you want to receive your OTP?
                    </p>
                  </div>
                </Stack>
                <Divider className="div-25" />
                <Tabs
                  defaultActiveKey="1"
                  appearance="subtle"
                  activeKey={activeTab}
                  onSelect={setActiveTab}
                >
                  <Tabs.Tab eventKey="1" title="Email" icon={<EmailFillIcon />}>
                    <div className="form-container">
                      <FloatingLabelInput
                        label="Enter Your Email"
                        name="email"
                        value={formik.values.email}
                        onChange={(value) =>
                          formik.setFieldValue("email", value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                        placeholder="Enter Your Email"
                      />
                    </div>
                  </Tabs.Tab>
                  <Tabs.Tab
                    eventKey="3"
                    title="Text Message(SMS)"
                    onclick={handlePhoneTab}
                    icon={<MessageIcon />}
                  >
                    <div className="form-container">
                      <Stack
                        className="codepicker"
                        size="lg"
                        style={styles}
                        direction="column"
                        alignItems="flex-start"
                        appearance="subtle"
                      >
                        <SelectPicker
                          placeholder="Select Your Country"
                          data={CodeData}
                          value={formik.values.countryCode} // Formik's value for countryCode
                          onChange={(value) =>
                            formik.setFieldValue("countryCode", value)
                          } // Formik's onChange handler
                          onBlur={formik.handleBlur} // Formik's onBlur handler
                          block
                        />
                        {formik.touched.countryCode &&
                        formik.errors.countryCode ? (
                          <div className="error-message">
                            {formik.errors.countryCode}
                          </div> // Display validation error
                        ) : null}
                      </Stack>
                    </div>
                    <div className="form-container">
                      <FloatingLabelInput
                        id="phoneNumber"
                        label="Enter Your Phone Number"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={(value) =>
                          formik.setFieldValue("phoneNumber", value)
                        }
                        onBlur={formik.handleBlur}
                        error={formik.errors.phoneNumber}
                        touched={formik.touched.phoneNumber}
                        placeholder="Enter Your Phone Number"
                      />
                    </div>
                  </Tabs.Tab>
                </Tabs>

                <Button type="submit" className="btn" block>
                  {actionText}
                </Button>
                <p className="text-center action-text poppins-regular">
                  <a href="#" className="active cta another-cta">
                    I can't remember my email or phone number.
                  </a>
                </p>
              </div>
            )}
            <OtpVerification
              onSubmit={handleOtpSubmit}
              resendPass={resendPass}
              handleResendClick={handleResendClick}
              timeLeft={timeLeft}
              showOtpVerification={showOtpVerification}
              handleBackClick={handleBackClick}
            />
          </form>
        </div>
      </div>
    </Panel>
  );
};

export default ZomatoSignUp;
