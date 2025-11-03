/**
 * components/common
 * Modal/Modal.tsx
**/

import { useEffect } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  showModal: boolean;
  isAnimation: boolean;
  onClose: () => void;
  title: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({
  showModal,
  isAnimation,
  onClose,
  title,
  body,
  footer
}: ModalProps) {
  // Esc키로 모달 닫기
  useEffect(() => {
    if (!showModal) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [showModal, onClose]);

  if (!showModal) return null;

  return (
    <div
      className={`${styles.modalBox} ${isAnimation ? styles.open : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalInner}>
          <div className={styles.modalHeader}>
            <h2 id="modal-title" className={styles.title}>{title}</h2>
          </div>
          {body && <div className={styles.modalBody}>{body}</div>}
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}