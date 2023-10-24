import styled from 'styled-components';

const StyledMessage = styled.p`
  font-size: var(--fs-sm);
  text-align: center;
  padding: 20px;
`;

const Message = ({ children }: { children: string }) => {
  return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
