import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required "),
  phoneNumber: Yup.number().required("Phone Number is required "),
  countryCode: Yup.number().required("Country Code is required "),
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits") // Ensure OTP is exactly 6 digits
    .required("OTP is required"),
});
