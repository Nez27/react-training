import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNotFound = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
`;

const Heading = styled.h1`
  font-size: 40px;
  color: var(--primary-color);
`;

const Button = styled.button`
  padding: 10px 20px;

  background-color: var(--primary-color);
  color: var(--light-text);
  text-transform: uppercase;
  font-weight: 500;

  border-radius: var(--radius-sm);
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
