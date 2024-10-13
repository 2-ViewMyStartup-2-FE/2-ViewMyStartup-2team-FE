import styles from "../css/InvestModalHeader.module.css";
import exitImg from "../asset/images/exit.png";
function InvestModalHeader({ mode = "post", closeModal }) {
  const headerTitle = mode === "post" ? "기업에 투자하기" : "투자 수정하기";
  return (
    <div className={styles.header}>
      <p className={styles.title}>{headerTitle}</p>
      <button type="button" className={styles.exitBtn} onClick={closeModal}>
        <img src={exitImg} alt="나가기버튼" />
      </button>
    </div>
  );
}
export default InvestModalHeader;
