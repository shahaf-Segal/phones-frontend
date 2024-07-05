import React from "react";
import styles from "./FormBlock.module.css";

interface FormBlock {
  inputName: string;
  type: string;
  labelText: string;
  changeFunc?: (event: React.ChangeEvent) => void;
  rows: number;
  placeholder: string;
  required: boolean;
  defaultValue: string | number | undefined;
  rtl?: boolean;
  value: string;
}

const FormBlock: React.FC<FormBlock> = ({
  inputName,
  type = "text",
  labelText,
  changeFunc = () => {},
  placeholder = "",
  defaultValue,
  rows = 1,
  required = false,
  rtl = true,
  value,
}) => {
  return (
    <>
      <label htmlFor={inputName} className={styles["form-label"]}>
        <strong>{labelText}</strong>
      </label>
      {type === "textarea" ? (
        <textarea
          id={inputName}
          name={inputName}
          onChange={changeFunc}
          className={styles["form-input"]}
          {...(defaultValue && { defaultValue })}
          {...(value && { value })}
          rows={rows}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={inputName}
          name={inputName}
          onChange={changeFunc}
          className={styles["form-input"]}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          {...(defaultValue && { defaultValue })}
          {...(value && { value })}
        />
      )}
    </>
  );
};

export default FormBlock;
