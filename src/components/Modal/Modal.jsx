import { useEffect } from "react";
import ReactDOM from "react-dom";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modalRoot");

export const Modal = ({ children, toggleModal }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [toggleModal]);

  const handleClickOnBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div onClick={handleClickOnBackdrop} className={s.modalContent}>
      <div className={s.modalContent}>
        <button type="button" onClick={toggleModal}>
          close
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
