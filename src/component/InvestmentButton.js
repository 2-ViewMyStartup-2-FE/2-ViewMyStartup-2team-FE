import styles from "../css/InvestmentButton.module.css";
function InvestmentButton({ closeModal, onSubmit }) {
  return (
    <div className={styles.frame}>
      <div className={styles.layoutContainer}>
        <button type="button" className={styles.cancel} onClick={closeModal}>
          취소
        </button>
        <button type="submit" className={styles.invest} onClick={onSubmit}>
          투자하기
        </button>
      </div>
    </div>
  );
}
export default InvestmentButton;
