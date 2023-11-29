import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: all 0.5s;
`;

const StyledModalContent = styled.div`
  background-color: var(--form-color);

  border-radius: var(--radius-md);

  padding: 30px 30px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: var(--overlay-color);

  z-index: 1000;
  transition: all 0.5s;
`;

const TitleModal = styled.p`
  font-size: var(--fs-md);
  font-weight: 600;
  text-align: center;

  margin-bottom: 30px;
`

export { StyledModal, Overlay, StyledModalContent, TitleModal };
