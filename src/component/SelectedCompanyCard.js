import styles from "../css/SelectedCompanyCard.module.css";
function SelectedCompanyCard({ myCompany, className }) {
  return (
    <div className={`${styles.selectedCompanyCard} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>내가 선택한 기업</h2>
        <button className={styles.selectOtherCompanyBtn}>
          다른 기업 비교하기
        </button>
      </div>
      <div className={styles.companyInfoFrame}>
        <div className={styles.companyInfo}>
          <img
            src={myCompany.logo}
            className={styles.logo}
            alt="로고이미지"
          ></img>
          <p className={styles.name}>{myCompany.name}</p>
          <p className={styles.category}>{myCompany.category}</p>
        </div>
      </div>
    </div>
  );
}
export default SelectedCompanyCard;
