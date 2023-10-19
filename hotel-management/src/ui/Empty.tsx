import styled from 'styled-components';

const StyledEmpty = styled.p`
  font-size: var(--fs-sm);
  text-align: center;
  padding: 20px;
`;

const Empty = ({ children }: { children: string }) => {
  return <StyledEmpty>{children}</StyledEmpty>;
};

export default Empty;
