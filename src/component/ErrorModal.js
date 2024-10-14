import styles from "../css/ErrorModal.module.css";
import closeIcon from "../asset/images/ic_delete.png";

export default function ErrorModal({
  onClose,
  handleErrorConfirmBtn,
  errorMessage = ""
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.errorContainer}>
        <div className={styles.errorModalTitle}>
          <img src={closeIcon} alt="취소" onClick={onClose} />
        </div>
        <div className={styles.errorModalContent}>
          <p>{errorMessage}</p>
          <div className={styles.buttonContainer}>
            <button onClick={handleErrorConfirmBtn}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
}
