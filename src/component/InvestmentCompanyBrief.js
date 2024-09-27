import styles from "../css/InvestmentCompanyBrief.module.css";
function InvestmentCompanyBrief() {
  return (
    <div className={styles.frame}>
      <div className={styles.infoLabel}>투자 기업 정보</div>
      <div className={styles.info}>
        <img className={styles.logoImg} />
        <div className={styles.layoutContainer}>
          <p className={styles.companyName}>코드잇</p>
          <p className={styles.companyCategory}>에듀테크</p>
        </div>
      </div>
    </div>
  );
}
export default InvestmentCompanyBrief;
