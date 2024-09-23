import React, { useState, useEffect } from "react";
import { Input, InputGroup } from "rsuite";

const FloatingLabelInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled,
  placeholder,
  addon , // Default value for the addon
}) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFocused(Boolean(value));
  }, [value]);

  return (
    <div className={`floating-label-input ${focused ? "focused" : ""}`}>
      <InputGroup inside>
        <InputGroup.Addon>{addon}</InputGroup.Addon>
        <Input
          placeholder={placeholder}
          name={name}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(value !== "");
            onBlur(e);
          }}
          onChange={onChange}
          size="lg"
          className={`form-control ${error && touched ? "error-border" : ""}`}
          disabled={disabled}
          autoComplete="off"
        />
      </InputGroup>
      {error && touched && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FloatingLabelInput;
