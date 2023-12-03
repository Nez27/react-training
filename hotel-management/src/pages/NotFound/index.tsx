import { useNavigate } from 'react-router-dom';

// Styled
import { Button, Heading, StyledNotFound } from './styled';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <StyledNotFound>
      <Heading>The page not found!</Heading>
      <Button onClick={() => navigate(-1)}>Go back!</Button>
    </StyledNotFound>
  );
};

export default NotFound;
