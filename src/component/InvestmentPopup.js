import styles from "../css/InvestmentPopup.module.css";
import exitImg from "../asset/images/ic_x.png";
function InvestmentPopup({ closePopup }) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.frame}>
        <div className={styles.content}>
          <div className={styles.layoutContainer}>
            <button className={styles.exitBtn} onClick={closePopup}>
              <img src={exitImg} alt="종료버튼 이미지" />
            </button>
          </div>
          <div className={styles.completedMessage}>투자가 완료되었어요!</div>
          <button className={styles.confirmBtn} onClick={closePopup}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
export default InvestmentPopup;
