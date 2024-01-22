import React, { useState } from "react";
interface TextInputProps {
  validators?: [(value: string) => string];
  className: string;
  errorClassNameInput?: string;
  errorClassNameMessage?: string;
  onInput?: (value: string) => void;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type?: string;
  validityMap: Map<string, boolean>;
}
const TextInput: React.FC<TextInputProps> = ({
  validators,
  className,
  errorClassNameInput,
  errorClassNameMessage,
  onInput,
  value,
  setValue,
  type,
  placeholder,
}) => {
  const [error, setError] = useState<string>("");
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={error ? errorClassNameInput : className}
        value={value}
        onInput={(val) => {
          let value = val.currentTarget.value;
          setValue(value);

          if (value && validators) {
            let errorResult = "";
            for (let i = 0; i < validators.length; i++) {
              let validateMessage = validators[i](value);
              if (validateMessage) {
                errorResult = validateMessage;
                break;
              }
            }
            setError(errorResult);
          } else setError("");

          if (onInput) {
            onInput(value);
          }
        }}
      ></input>
      {error && (
        <div
          className={`h-[30px] overflow-y-auto text-[10pt] ${errorClassNameMessage}`}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default TextInput;
