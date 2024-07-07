import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick(): any;
  style: "primary" | "secondary" | "borderless" | "outline";
  fullWidth?: boolean;
  backgroundColor: "dark" | "light";
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  icon,
  iconPosition = "right",
  onClick,
  style = "primary",
  fullWidth = false,
  backgroundColor = "light",
  disabled,
}) => {
  const buttonClassName = `${styles.button} ${styles[`button-${style}`]} ${
    styles[`button-${style}-${backgroundColor}`]
  } ${fullWidth ? styles["full-width"] : ""} ${
    disabled ? styles["button-disabled"] : ""
  }`;
  return (
    <button
      type={type}
      className={buttonClassName}
      style={{ width: fullWidth ? "100%" : "fit-content" }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "right" && icon}
      {text}
      {icon && iconPosition === "left" && icon}
    </button>
  );
};

export default Button;
