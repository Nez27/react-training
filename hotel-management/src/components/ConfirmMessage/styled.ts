import styled from "styled-components";

const StyledConfirmDelete = styled.div`
  width: 450px;

  & p {
    font-size: var(--fs-sm);
    text-align: center;
    margin-bottom: 30px;
  }

  & div {
    display: flex;
    justify-content: space-around;

    padding-inline: 100px;
  }
`;

export { StyledConfirmDelete };
