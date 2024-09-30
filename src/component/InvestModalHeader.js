import styles from "../css/InvestModalHeader.module.css";
import exitImg from "../asset/images/exit.png";
function InvestModalHeader({ closeModal }) {
  return (
    <div className={styles.header}>
      <p className={styles.title}>기업에 투자하기</p>
      <button type="button" className={styles.exitBtn} onClick={closeModal}>
        <img src={exitImg} alt="나가기버튼" />
      </button>
    </div>
  );
}
export default InvestModalHeader;
