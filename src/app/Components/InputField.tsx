import React from "react";
import { FC, useEffect, useState } from "react";

export type IInputFieldProps = {
  placeholder: string;
  onChange: () => void;
  value: string | number;
};

const InputField: FC<IInputFieldProps> = ({ placeholder, onChange, value }) => {
  return (
    <input
      className="border rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputField;
