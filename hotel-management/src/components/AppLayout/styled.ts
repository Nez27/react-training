import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
  
  height: 100vh;
`;

const Main = styled.main`
  border: 1px solid var(--border-color);

  overflow: scroll;
`;

export { StyledAppLayout, Main };
