import { useState } from "react";

import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import IconDropDown from "../IconDropDown/IconDropDown";
import styles from "./SearchBar.module.css";

SearchBar.propTypes = {
  sendSearch: PropTypes.func,
};

export function SearchBar({ sendSearch }) {
  const [input, setInput] = useState("");
  const [optionSelected, setOptionSelected] = useState("model");

  const selectOptions = ["model", "brand", "os"];

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles["input-wrapper"]}>
      <div className={styles["search-icon"]}>
        <Icon
          name="MagnifyingGlassIcon"
          onClick={() => sendSearch(input)}
          color="var(--purple-color)"
          width={20}
          height={20}
        />
      </div>
      <input
        className={styles["search-input"]}
        placeholder={`search by ${optionSelected}`}
        value={input}
        onChange={handleChange}
      />
      <div className={styles["select-container"]}>
        <IconDropDown
          options={selectOptions}
          changeOption={setOptionSelected}
        />
      </div>
    </div>
  );
}
