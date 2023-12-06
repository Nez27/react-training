import {
  ReactNode,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

// Hooks
import { useOutsideClick } from '@src/hooks/useOutsideClick';

// Contexts
import { ModalContext } from '@src/contexts/ModalContext';

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
  renderChildren: (onOpenModal: () => void) => ReactNode;
  modalName: string;
}

const Open = ({ renderChildren, modalName }: IOpen) => {
  const { open } = useContext(ModalContext);

  return renderChildren(() => open!(modalName));
};

interface IWindow {
  renderChildren: (callBack: () => void) => ReactNode;
  name: string;
  title: string;
}

const Window = ({ renderChildren, name, title }: IWindow) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close!);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <StyledModalContent>
          <TitleModal>{title}</TitleModal>
          {renderChildren(close!)}
        </StyledModalContent>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
