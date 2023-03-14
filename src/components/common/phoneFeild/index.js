import React from "react";
import "react-phone-number-input/style.css";
import "./styles.css";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import { Box } from "@mui/material";

import { useField } from "formik";

const PhoneFeild = ({
  name,
  labelFalse,
  customClass,
  onCountryChange,
  props,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Box className={"Phone"}>
      {!labelFalse && <label>Phone</label>}
      <PhoneInput
        // {...field}
        {...props}
        placeholder="614 234 6782"
        value={field.value}
        name={name}
        country="AU"
        onCountryChange={onCountryChange}
        onChange={(value) => {
          helpers.setValue(value);
        }}
        defaultCountry="AU"
      />
    </Box>
  );
};

export default PhoneFeild;
