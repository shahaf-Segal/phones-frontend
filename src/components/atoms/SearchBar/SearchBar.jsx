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
  const [optionSelected, setOptionSelected] = useState("");

  const selectOptions = ["model", "brand", "os"];

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles["input-wrapper"]}>
      <Icon
        name="MagnifyingGlassIcon"
        onClick={() => sendSearch(input)}
        color="var(--purple-color)"
        width={20}
        height={20}
      />
      <input
        className={styles["search-input"]}
        placeholder="search"
        value={input}
        onChange={handleChange}
      />
      <div className={styles["select-container"]}>
        <IconDropDown options={selectOptions}></IconDropDown>
      </div>
    </div>
  );
}
