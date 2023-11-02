// Styled
import { StyledMessage } from './styled';

const Message = ({ children }: { children: string }) => {
  return <StyledMessage>{children}</StyledMessage>;
};

export default Message;
