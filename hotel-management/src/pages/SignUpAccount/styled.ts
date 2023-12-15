import styled from 'styled-components';

const Title = styled.h2`
  font-size: var(--fs-md);
  color: var(--dark-text);
  text-transform: capitalize;
`;

const StyledSignUpAccount = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormArea = styled.div`
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  
  padding: 20px 40px;
  width: 500px;

  margin-top: 50px;
`

export {
  Title,
  StyledSignUpAccount,
  FormArea,
};
