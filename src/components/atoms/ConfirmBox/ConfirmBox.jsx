import PropTypes from "prop-types";
import styles from "./ConfirmBox.module.css"; // Import the CSS file for styling
ConfirmBox.propTypes = {
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

function ConfirmBox({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles["confirm-box"]}>
      <p className={styles["confirm-text"]}>{message}</p>
      <div className={styles["confirm-box-buttons-container"]}>
        <button onClick={onConfirm} className={styles["confirm-btn"]}>
          {confirmText}
        </button>
        <button onClick={onCancel} className={styles["cancel-btn"]}>
          {cancelText}
        </button>
      </div>
    </div>
  );
}

export default ConfirmBox;
