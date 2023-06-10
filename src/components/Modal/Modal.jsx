import { ModalWrapper, ModalContent } from './Modal.style';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Modal({ onClose, children }) {
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ModalWrapper onClick={onBackdropClick}>
      <ModalContent>
        <div className="modal">{children}</div>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
