import styled from 'styled-components';

interface IPaginationBtn {
  disabled: boolean;
}

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--fs-sm-x);
`;

const Buttons = styled.div`
  display: flex;
  gap: 30px;
`;

const PaginationBtn = styled.button<IPaginationBtn>`
  background-color: var(--secondary-btn-color);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 5px 10px;

  transition: all 0.3s;

  & svg {
    height: 20px;
    width: 20px;
  }

  &:hover:not(:disabled) {
    background-color: var(--primary-color);
    color: var(--light-text);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export { StyledPagination, PaginationBtn, Buttons };
