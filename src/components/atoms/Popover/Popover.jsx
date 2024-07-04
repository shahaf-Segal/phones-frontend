import propTypes from "prop-types";
import { useEffect } from "react";
import styles from "./Popover.module.css";

Popover.propTypes = {
  children: propTypes.node,
  isPopoverOpen: propTypes.bool,
  onClose: propTypes.func,
};
export const Popover = ({ children, isPopoverOpen, onClose }) => {
  const togglePopover = () => {
    onClose();
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.body.classList.add("active-popover");
    } else {
      document.body.classList.remove("active-popover");
    }
  }, [isPopoverOpen]);

  return (
    <>
      {isPopoverOpen && (
        <div className={styles["popover"]}>
          <div onClick={togglePopover} className={styles["overlay"]}></div>
          <div className={styles["popover-content"]}>{children}</div>
        </div>
      )}
    </>
  );
};
