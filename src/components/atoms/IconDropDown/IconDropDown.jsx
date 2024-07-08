import PropTypes from "prop-types";
import { useMemo, useState } from "react";
IconDropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};
function IconDropDown({ options }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const renderOptions = useMemo(
    () => options.forEach((value) => <p key={`option-${value}`}>{value}</p>),
    [options]
  );

  return (
    <div>
      <button onClick={toggleDropDown}> {`>`} </button>

      {dropDownOpen ? renderOptions : null}
    </div>
  );
}

export default IconDropDown;
