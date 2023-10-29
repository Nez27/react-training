import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  margin: 100px auto;

  width: 80px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, var(--primary-color) 94%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 30%, var(--primary-color));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  mask: none;
  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
