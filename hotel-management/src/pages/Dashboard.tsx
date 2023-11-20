import { useUserRoomAvailable } from '@hook/useUserRoomAvailable';
import styled from 'styled-components';

const StyledDashboard = styled.main`
  padding: 20px;
`;

const Dashboard = () => {
  const { roomsAvailable, usersAvailable } = useUserRoomAvailable();

  console.log('Rooms Available: ', roomsAvailable);
  console.log('Users available: ', usersAvailable);

  return (
    <StyledDashboard>
      <p>This page currently still develop. Please try again later!</p>
    </StyledDashboard>
  );
};

export default Dashboard;
