import {
  ReactElement,
  ReactNode,
  cloneElement,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// Hooks
import { useOutsideClick } from '@hook/useOutsideClick';

// Contexts
import { ModalContext } from '@context/ModalContext';

// Styled
import { Overlay, StyledModal, StyledModalContent, TitleModal } from './styled';

interface IModal {
  children: ReactNode;
}

const Modal = ({ children }: IModal) => {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

interface IOpen {
  renderChildren: (onCloseModal: () => void) => ReactNode;
  modalName: string;
}

const Open = ({ renderChildren, modalName }: IOpen) => {
  const { open } = useContext(ModalContext);

  return renderChildren(() => open!(modalName));
};

interface IWindow {
  children: ReactElement;
  name: string;
  title: string;
}

const Window = ({ children, name, title }: IWindow) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close!);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <StyledModalContent>
          <TitleModal>{title}</TitleModal>
          {cloneElement(children, { onCloseModal: close })}
        </StyledModalContent>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
