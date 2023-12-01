import { useSearchParams } from 'react-router-dom';

// Constants
import { DEFAULT_PAGE_SIZE } from '@constant/config';

// Styled
import { Buttons, PaginationBtn, StyledPagination } from './styled';

// Components
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

  const nextPage = () => {
    const next = currentPage === totalPage ? currentPage : currentPage + 1;

    searchParams.set('page', next.toString());
    setSearchParams(searchParams);
  };

  const previousPage = () => {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', previous.toString());
    setSearchParams(searchParams);
  };

  const fromIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE + 1;

  const toIndex =
    currentPage === totalPage ? count : currentPage * DEFAULT_PAGE_SIZE;

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
