import { deleteInvestment } from "../api/CompanyDetailAPI.js";
import closeIcon from "../asset/images/ic_x.png";
import styles from "../css/DeleteInvestment.module.css";

export default function DeleteInvestment({
  investment,
  onClose,
  setErrorMessage,
  setIsErrorModal,
  setShowDeleteModal,
  fetchData
}) {
  // 삭제 처리
  const handleDelete = async () => {
    const deleteSuccess = await deleteInvestment(investment.id);

    if (deleteSuccess) {
      fetchData();
      onClose(); // 모달 닫기
    } else {
      // 삭제 실패 시 에러 처리 (필요시 추가)
      setErrorMessage("투자를 삭제하는데 실패하였습니다.");
      setIsErrorModal(true);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.deleteContainer}>
        <div className={styles.deleteModalTitle}>
          <img src={closeIcon} alt="취소" onClick={onClose} />
        </div>
        <div className={styles.deleteModalContent}>
          <p>정말로 삭제하시겠습니까?</p>
          <div className={styles.buttonContainer}>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
