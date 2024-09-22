import React from "react";
import { SelectPicker, Stack } from "rsuite";
import { useFormik } from "formik";
import { RegisterSchema } from "../Schema/RegisterSchema";
import { countryData } from "./ContryData";

const formik = useFormik({
  initialValues: {
    countryCode: "",
  },
  validationSchema: RegisterSchema.pick(["countryCode"]),
  onSubmit: (values) => {},
});

const PhoneNumberInput = () => {
  const styles = { width: "100%", display: "block", marginBottom: 10 };

  const countryData = countryData.map((country) => ({
    label: country.country,
    value: country.country,
  }));

  return (
    <Stack
      className="codepicker"
      size="lg"
      style={styles}
      direction="column"
      alignItems="flex-start"
      appearance="subtle"
    >
      <SelectPicker placeholder="Select Your Country" data={countryData} />
    </Stack>
  );
};

export default PhoneNumberInput;
