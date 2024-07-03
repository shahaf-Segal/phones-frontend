import { useNavigate } from "react-router-dom";
import styles from "./NavigateLink.module.css";

import PropTypes from "prop-types";

NavigateLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  active: PropTypes.bool,
};

function NavigateLink({ to, text, active }) {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles["navigate-link"]} ${
        active && styles["active-navigate-link"]
      } `}
      onClick={() => {
        navigate(to);
      }}
    >
      <h2>{text}</h2>
    </div>
  );
}

export default NavigateLink;
