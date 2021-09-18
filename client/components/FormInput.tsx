import React, { ChangeEventHandler, FunctionComponent } from "react";

interface IFormInputProps {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

const FormInput: FunctionComponent<IFormInputProps> = (props) => {
  return (
    <>
      {props.error && (
        <div className="text-sm text-red-600 mb-1">{props.error + "*"}</div>
      )}
      <div className="mb-8 ring-1 ring-gray-300 rounded-lg focus-within:ring-gray-500 focus-within:ring-2">
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className="w-full px-6 py-4 rounded-lg text-gray-700 "
        />
      </div>
    </>
  );
};

export default FormInput;
