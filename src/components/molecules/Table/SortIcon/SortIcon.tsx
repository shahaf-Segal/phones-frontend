import { FC } from "react"; // Import FC type for functional components
import { Icon } from "../../../atoms/Icon";
import styles from "./SortIcon.module.css";

type SortProps = {
  sort: {
    sortOrder: string;
    sortBy: string;
  };
  sortKey?: string; // Make isSortActive optional
};

const SortIcon: FC<SortProps> = ({ sort, sortKey = "" }) => {
  const isSortActive = sortKey === sort.sortBy;

  const isIconUp = !isSortActive || sort.sortOrder === "asc";

  return (
    <span
      className={`${
        isSortActive ? styles["sort-icon"] : styles["sort-icon-deactivated"]
      }`}
    >
      <Icon
        name="ArrowDownIcon"
        style={isIconUp ? { transform: "rotate(180deg)" } : {}}
        color="var(--background-light-color)"
        width={25}
        height={25}
      />
    </span>
  );
};

export default SortIcon;
