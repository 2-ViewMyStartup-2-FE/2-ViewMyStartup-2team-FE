import { useState } from 'react';

// 모달 상태를 관리하는 커스텀 훅
function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };// 상태와 함수를 반환.
}