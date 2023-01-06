import React from 'react';

import { useClickAway } from '@utils/useClickAway';

import styles from './Modal.module.scss';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<Props> = (props) => {
  const { isOpen, onClose, children } = props;

  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const handleClose = React.useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  const handleKeydown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useClickAway(modalRef, handleClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalWrapper}>
      <div ref={modalRef} className={styles.modal}>
        {children}
      </div>
    </div>
  );
};

export default React.memo(Modal);
