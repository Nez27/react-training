import styled from 'styled-components';

const StyledSidebar = styled.aside`
  padding: 50px 20px;

  grid-row: 1 / 3;

  border: 1px solid var(--border-color);
`;

const Heading = styled.h1`
  font-size: var(--fs-md);
  text-transform: uppercase;
  text-align: center;

  cursor: pointer;

  color: var(--primary-color);
`;

export { StyledSidebar, Heading };
