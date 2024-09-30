import styles from "../css/InvestmentCompanyBrief.module.css";
function InvestmentCompanyBrief({ myCompany, className }) {
  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.infoLabel}>투자 기업 정보</div>
      <div className={styles.info}>
        <img className={styles.logoImg} src={myCompany.logo} alt="로고이미지" />
        <div className={styles.layoutContainer}>
          <p className={styles.companyName}>{myCompany.name}</p>
          <p className={styles.companyCategory}>{myCompany.category}</p>
        </div>
      </div>
    </div>
  );
}
export default InvestmentCompanyBrief;
