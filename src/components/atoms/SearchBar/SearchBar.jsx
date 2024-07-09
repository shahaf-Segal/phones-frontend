import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import IconDropDown from "../IconDropDown/IconDropDown";
import styles from "./SearchBar.module.css";

SearchBar.propTypes = {
  sendSearch: PropTypes.func,
  query: PropTypes.any,
};

export function SearchBar({ sendSearch, query }) {
  const [input, setInput] = useState("");
  const [optionSelected, setOptionSelected] = useState("model");

  const selectOptions = ["model", "brand", "os"];

  const deleteQuery = () => {
    for (const key of query.keys()) {
      query.delete(key);
    }
    query.set("sort", "0");
  };
  const activateSearch = () => {
    deleteQuery();
    query.set(optionSelected, input);
    sendSearch();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const getFirstSearch = () => {
      for (let i = 0; i < selectOptions.length; i++) {
        const queryValue = query.get(selectOptions[i]);
        if (queryValue) return [selectOptions[i], queryValue];
      }
      return ["", ""];
    };
    const [queryOption, queryInput] = getFirstSearch();
    setInput(queryInput);
    setOptionSelected(queryOption);
  }, []);

  return (
    <div className={styles["input-wrapper"]}>
      <div className={styles["search-icon"]}>
        <Icon
          name="MagnifyingGlassIcon"
          onClick={activateSearch}
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
        title={`search by ${selectOptions}`}
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
