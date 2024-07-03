import { cloneElement, isValidElement } from 'react';
import { Icon } from '../../atoms/Icon';
import EmptyTable from './EmptyTable/EmptyTable.jsx';
import styles from './Table.module.css';

/**
 * Represents a column in a table.
 * @typedef {Object} TableColumn
 * @property {string} header - The header text displayed in the table. (required)
 * @property {string | React.ReactElement} cellContent - The content to be displayed in the table cell, can be a data key or a React element. (required)
 * @property {string} width - The width of the column. (required)
 * @property {'start' | 'center' | 'end'} [textAlign] - The horizontal alignment of the cell content. (optional)
 * @property {'top' | 'middle' | 'bottom'} [verticalAlign] - The vertical alignment of the cell content. (optional)
 * @property {Record<string, string>} [propsMapping] - Mapping of prop names to data keys for React elements. (optional)
 * @property {boolean} [sortable] - Indicates if the column is sortable. (optional)
 */
interface TableColumn {
  header: string;
  cellContent: keyof Record<string, any> | React.ReactElement;
  width: string;
  textAlign?: 'start' | 'center' | 'end';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  propsMapping?:
    | Record<string, string>
    | ((data: Record<string, any>) => Record<string, any>);
  sortable?: boolean;
}

/**
 * @typedef {object} TableProps
 * @property {Record<string, any>[]} data - The array of data that is being sent (required)
 * @property {string} [rowHeight] - Changes the height of each row (optional)
 * @property {{ sortBy: keyof Record<string, any>; sortOrder: 'asc' | 'desc' }} [sort] - The sort configuration for the table
 * @property {React.Dispatch<
 *   React.SetStateAction<{
 *     sortBy: keyof Record<string, any>;
 *     sortOrder: 'asc' | 'desc';
 *   }>
 * >} [setSort] - The function to set the sort state (optional).
 */

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  rowHeight?: string;
  sort?: { sortBy: keyof Record<string, any>; sortOrder: 'asc' | 'desc' };
  setSort?: React.Dispatch<
    React.SetStateAction<{
      sortBy: keyof Record<string, any>;
      sortOrder: 'asc' | 'desc';
    }>
  >;
  reset: (() => void) | null;
  showEmptyTable: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  rowHeight,
  sort = { sortBy: '', sortOrder: 'asc' },
  setSort = () => {},
  reset,
  showEmptyTable = true,
}) => {
  const renderCell = (row: Record<string, any>, column: TableColumn) => {
    if (isValidElement(column.cellContent)) {
      const propsMapping = column.propsMapping || {};
      const props =
        typeof propsMapping === 'function' ? propsMapping(row) : propsMapping;
      return cloneElement(column.cellContent, props);
    } else if (typeof column.cellContent === 'string') {
      return <div>{row[column.cellContent]}</div>;
    }
    return null;
  };

  return (
    <table className={styles['table']}>
      <thead className={styles['table-head']}>
        <tr>
          {columns?.map((column, index) => (
            <th
              className={styles['table-head-cell']}
              key={index}
              style={{ width: column.width }}
              onClick={() => {
                if (column.sortable && sort) {
                  const newSortOrder =
                    sort.sortOrder === 'asc' ? 'desc' : 'asc';
                  setSort({
                    sortBy: column.cellContent as keyof Record<string, any>,
                    sortOrder: newSortOrder,
                  });
                }
              }}
            >
              {column.header}
              {column.sortable && (
                <span className={styles['sort-icon']}>
                  {sort.sortOrder === 'asc' ? (
                    <Icon
                      name="ArrowDownIcon"
                      style={{ transform: 'rotate(180deg)' }}
                      color="var(--mainGrey)"
                      width={16}
                      height={16}
                    />
                  ) : (
                    <Icon
                      name="ArrowDownIcon"
                      color="var(--mainGrey)"
                      width={16}
                      height={16}
                    />
                  )}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && showEmptyTable ? (
          <EmptyTable columnLength={columns.length} reset={reset} />
        ) : (
          data?.map((row, rowIndex) => (
            <tr
              className={styles['table-row']}
              style={{ height: rowHeight }}
              key={rowIndex}
            >
              {columns?.map((column, colIndex) => (
                <td
                  className={styles['table-data-cell']}
                  key={colIndex}
                  style={{
                    textAlign: column.textAlign,
                    verticalAlign: column.verticalAlign,
                  }}
                >
                  {renderCell(row, column)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
