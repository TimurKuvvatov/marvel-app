import { FC } from 'react';
import classes from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
  onLastPage: () => void;
  onFirstPage: () => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
  onLastPage,
  onFirstPage,
}) => {
  const getPageRange = () => {
    const range = [];
    const start = Math.max(0, currentPage - 3);
    const end = Math.min(totalPages, start + 7);

    for (let i = start; i < end; i++) {
      if (i < totalPages) {
        range.push(i);
      }
    }
    return range;
  };

  const pageRange = getPageRange();

  return (
    <div className={classes.wrapper}>
      {currentPage > 0 && (
        <button className={classes.arrow} onClick={onFirstPage}>
          {'<<'}
        </button>
      )}
      {currentPage > 0 && (
        <button className={classes.arrow} onClick={onPrevious}>
          {'<'}
        </button>
      )}
      {pageRange.map((page) => (
        <button
          className={classes.number}
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page + 1}
        </button>
      ))}
      {currentPage < totalPages - 1 && (
        <>
          <button className={classes.arrow} onClick={onNext}>
            {'>'}
          </button>
          <button className={classes.arrow} onClick={onLastPage}>
            {'>>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
