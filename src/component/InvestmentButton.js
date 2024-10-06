import styles from "../css/InvestmentButton.module.css";
function InvestmentButton({ mode, closeModal, className, disabled }) {
  const investButtonClass = disabled
    ? `${styles.invest} ${styles.error}`
    : `${styles.invest}`;
  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.layoutContainer}>
        <button type="button" className={styles.cancel} onClick={closeModal}>
          취소
        </button>
        <button type="submit" className={investButtonClass} disabled={disabled}>
          {mode === "edit" ? "수정하기" : "투자하기"}
        </button>
      </div>
    </div>
  );
}
export default InvestmentButton;
