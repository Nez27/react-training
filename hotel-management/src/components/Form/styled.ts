import styled, { css } from 'styled-components';

// Types
import { TDirection } from '@type/common';

interface IStyledFormRow {
  direction?: TDirection;
}

// Styled
import Button from '@commonStyle/Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledActionBtn = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 100px;
`;

const StyledFormRow = styled.div<IStyledFormRow>`
  display: flex;
  justify-content: space-between;

  ${(props) =>
    props.direction === 'horizontal'
      ? css`
          align-items: center;
          gap: 100px;
        `
      : css`
          flex-direction: column;
          gap: 15px;
        `}
`;

const Label = styled.label`
  font-size: var(--fs-sm);
  text-transform: capitalize;
`;

const Error = styled.p`
  color: var(--error-text);
  font-size: var(--fs-sm-2x);

  margin-top: 5px;
  padding-inline: 5px;
`;

const FormBtn = styled(Button)`
  width: 100%;

  &:disabled,
  &[disabled] {
    background-color: var(--disabled-btn-color);
  }
`;

StyledFormRow.defaultProps = {
  direction: 'horizontal',
};

export {
  StyledForm,
  StyledActionBtn,
  StyledFormRow,
  Label,
  Error,
  FormBtn
};
