import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required "),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?\d{10,}$/, "Phone number must be valid and include country code"),
  countryCode: Yup.string().required("Country code is required"),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensure OTP is exactly 6 digits
    .required("OTP is required"),
});

