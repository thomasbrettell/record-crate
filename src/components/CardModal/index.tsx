import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FC, useRef, MouseEvent } from 'react';

const modalRootEl = document.getElementById('modal-root');

const Overlay = styled.div`
  display: flex;
  overflow-x: hidden;
  align-items: flex-start;
  background-color: #000000a3;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 20;
  padding: 0 5px;
`;

interface CardModalProps {
  onClose: () => void;
}
const CardModal: FC<CardModalProps> = ({ onClose, children }) => {
  const overlayRef = useRef(null);
  const closeHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!modalRootEl) {
    return null;
  }
  return createPortal(
    <Overlay ref={overlayRef} onClick={closeHandler}>
      {children}
    </Overlay>,
    modalRootEl
  );
};

export default CardModal;
