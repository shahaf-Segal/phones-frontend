import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  fetchFunction: (page: number) => void;
  changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  fetchFunction,
  changePage,
}) => {
  const handleClick = (page: number) => {
    changePage(page);
    fetchFunction(page);
  };

  const pagesToShow = 3;
  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  if (endPage - startPage + 1 < pagesToShow) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, pagesToShow);
    } else {
      startPage = Math.max(1, totalPages - pagesToShow + 1);
    }
  }

  return (
    <section className={styles['pagination-container']}>
      {currentPage > 1 && (
        <span
          onClick={() => handleClick(currentPage - 1)}
          className={`${styles['pagination-page']} ${styles['pagination-current-page']}`}
        >
          {'<'}
        </span>
      )}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage,
      ).map((page) => (
        <span
          key={page}
          onClick={() => handleClick(page)}
          className={`${styles['pagination-page']} ${currentPage === page ? styles['pagination-current-page'] : ''}`}
        >
          {page}
        </span>
      ))}
      {currentPage < totalPages && (
        <span
          onClick={() => handleClick(currentPage + 1)}
          className={`${styles['pagination-page']} ${styles['pagination-current-page']}`}
        >
          {'>'}
        </span>
      )}
    </section>
  );
};

export default Pagination;
