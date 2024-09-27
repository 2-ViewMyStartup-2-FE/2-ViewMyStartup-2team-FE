import styles from "../css/InvestmentButton.module.css";
function InvestmentButton({ closeModal, onSubmit }) {
  const handleOnSubmit = (e) => onSubmit(e);
  return (
    <div className={styles.frame}>
      <div className={styles.layoutContainer}>
        <button className={styles.cancel} onClick={closeModal}>
          취소
        </button>
        <button className={styles.invest} onClick={handleOnSubmit}>
          투자하기
        </button>
      </div>
    </div>
  );
}
export default InvestmentButton;
