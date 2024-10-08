import styles from "../css/ErrorModal.module.css";
import closeIcon from "../asset/images/ic_delete.png";

export default function ErrorModal({
  onClose,
  handleErrorConfirmBtn,
  errorMessage = "",
}) {
  return (
    <>
      <div className={styles.errorModalTitle}>
        <img src={closeIcon} alt="취소" onClick={onClose} />
      </div>
      <div className={styles.errorModalContent}>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <p>잘못된 비밀번호로 삭제에 실패하셨습니다.</p>
        )}
        <div className={styles.buttonContainer}>
          <button onClick={handleErrorConfirmBtn}>확인</button>
        </div>
      </div>
    </>
  );
}
