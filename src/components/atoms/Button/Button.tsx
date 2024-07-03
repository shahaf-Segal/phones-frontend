import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick(): any;
  type: "primary" | "secondary" | "borderless" | "outline";
  fullWidth?: boolean;
  backgroundColor: "dark" | "light";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconPosition = "left",
  onClick,
  type = "primary",
  fullWidth = false,
  backgroundColor = "light",
  disabled,
}) => {
  const buttonClassName = `${styles.button} ${styles[`button-${type}`]} ${
    styles[`button-${type}-${backgroundColor}`]
  } ${fullWidth ? styles["full-width"] : ""} ${
    disabled ? styles["button-disabled"] : ""
  }`;
  return (
    <button
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
