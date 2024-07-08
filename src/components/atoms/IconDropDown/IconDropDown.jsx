import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import Icon from "../Icon/Icon";
import styles from "./IconDropDown.module.css";
IconDropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  changeOption: PropTypes.func,
};
function IconDropDown({ options, changeOption }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const optionClicked = (value) => {
    changeOption(value);
    setDropDownOpen(false);
  };

  const renderOptions = useMemo(() => {
    return options.map((value) => (
      <p
        className={styles["dropdown-item"]}
        key={`option-${value}`}
        onClick={() => {
          optionClicked(value);
        }}
      >
        {value}
      </p>
    ));
  }, [options, changeOption]);

  return (
    <div className={styles["icon-dropdown-container"]}>
      <Icon
        name="ArrowDownIcon"
        onClick={toggleDropDown}
        width={20}
        height={20}
        color="var(--highlight-text-color)"
      />
      {dropDownOpen && (
        <div className={styles["icon-dropdown"]}>
          <div className={styles["icon-dropdown-items"]}>{renderOptions}</div>
        </div>
      )}
    </div>
  );
}

export default IconDropDown;
