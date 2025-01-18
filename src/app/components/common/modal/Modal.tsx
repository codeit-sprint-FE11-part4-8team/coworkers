'use client';

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@/app/components/icons/IconClose';

interface ModalProps {
  hasCloseBtn?: boolean;
  portalRoot?: HTMLElement;
  closeModal: () => void;
}

function Modal({
  hasCloseBtn = false,
  portalRoot, // Modal 렌더링할 상위 DOM 노드
  closeModal,
  children,
}: PropsWithChildren<ModalProps>) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // 모달 외부 클릭 시 닫히도록 이벤트 처리
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // 마운트 시 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    // clean-up : 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center max-[744px]:justify-end">
      <div ref={modalRef} className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex w-96 flex-col items-center rounded-xl bg-background-secondary pb-8 pt-12 max-[744px]:w-full max-[744px]:rounded-b-none">
        {hasCloseBtn && (
          <button
            type="button"
            className="absolute right-4 top-4 h-6 w-6"
            title="모달 닫기"
            onClick={closeModal}
          >
            <IconClose />
          </button>
        )}
        {children}
      </div>
    </div>,
    portalRoot || document.body,
  );
}

export default Modal;
