import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';

const StyledNotFound = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

const Heading = styled.h1`
  font-size: var(--fs-lg);
  color: var(--primary-color);
`;

const useMoveBack = () => {
  const navigate = useNavigate();
  return () => navigate(-1);
};

const NotFound = () => {
  const onBack = useMoveBack();

  return (
    <StyledNotFound>
      <Heading>The page not found!</Heading>
      <Button onClick={onBack}>Go back!</Button>
    </StyledNotFound>
  );
};

export default NotFound;
