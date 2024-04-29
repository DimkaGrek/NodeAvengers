import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '../Icon/Icon';
import s from './ModalFilters.module.css';

const modalRoot = document.querySelector('#modalRoot');

export const ModalFilters = ({ children, toggleModal, title }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [toggleModal]);

  const handleClickOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleClickOnBackdrop} className={s.modalWrapper}>
      <div className={s.modalContent}>
        <button className={s.closeModalBtn} type="button" onClick={toggleModal}>
          <Icon id="close" className={s.closeModalIcon} size={12} />
        </button>
        <h2 className={s.modalTitle}>{title}</h2>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
