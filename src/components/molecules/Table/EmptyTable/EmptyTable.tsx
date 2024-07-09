import Button from "../../../atoms/Button/Button";
import Icon from "../../../atoms/Icon/Icon";
import style from "./EmptyTable.module.css";

interface EmptyTableProps {
  columnLength: number;
  reset: (() => void) | null;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  columnLength,
  reset = null,
}) => {
  return (
    <tr>
      <td colSpan={columnLength}>
        <div className={style["empty-table-container"]}>
          <Icon
            name="DumpsterIcon"
            height={100}
            width={100}
            color="var(--purple-color)"
          />
          <h1>No Matches Found</h1>
          {reset && (
            <Button
              onClick={reset}
              text="reset filters"
              style="primary"
              backgroundColor="dark"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default EmptyTable;
