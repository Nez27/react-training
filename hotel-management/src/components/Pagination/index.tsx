import { DEFAULT_PAGE_SIZE } from '@constant/config';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Buttons, PaginationBtn, StyledPagination } from './styled';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

interface IPagination {
  count: number;
}

const Pagination = ({ count }: IPagination) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const totalPage = Math.ceil(count / DEFAULT_PAGE_SIZE);

  const nextPage = useCallback(() => {
    const next = currentPage === totalPage ? currentPage : currentPage + 1;

    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, totalPage, setSearchParams]);

  const previousPage = useCallback(() => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', previous.toString());
    setSearchParams(searchParams);
  }, [currentPage, searchParams, setSearchParams]);

  const fromIndex = useMemo(
    () => (currentPage - 1) * DEFAULT_PAGE_SIZE + 1,
    [currentPage]
  );

  const toIndex = useMemo(
    () => (currentPage === totalPage ? count : currentPage * DEFAULT_PAGE_SIZE),
    [currentPage, count, totalPage]
  );

  return (
    totalPage > 1 && (
      <StyledPagination>
        <p>
          Showing {fromIndex} to {toIndex} of <span>{count}</span> results
        </p>

        <Buttons>
          <PaginationBtn onClick={previousPage} disabled={currentPage === 1}>
            <MdKeyboardArrowLeft /> <span>Previous</span>
          </PaginationBtn>

          <PaginationBtn
            onClick={nextPage}
            disabled={currentPage === totalPage}
          >
            <span>Next</span>
            <MdKeyboardArrowRight />
          </PaginationBtn>
        </Buttons>
      </StyledPagination>
    )
  );
};

export default Pagination;
