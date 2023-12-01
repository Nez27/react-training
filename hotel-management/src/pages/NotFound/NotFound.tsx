import { useNavigate } from 'react-router-dom';

// Styled
import { Button, Heading, StyledNotFound } from '.';


const NotFound = () => {
  const useMoveBack = () => {
    const navigate = useNavigate();
    return () => navigate(-1);
  };

  return (
    <StyledNotFound>
      <Heading>The page not found!</Heading>
      <Button onClick={useMoveBack}>Go back!</Button>
    </StyledNotFound>
  );
};

export default NotFound;
