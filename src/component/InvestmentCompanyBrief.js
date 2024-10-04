import styles from "../css/InvestmentCompanyBrief.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";

function InvestmentCompanyBrief({ myCompany, className }) {
  const handleImageError = (e) => (e.target.src = defaultImg);

  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.infoLabel}>투자 기업 정보</div>
      <div className={styles.info}>
        <img
          className={styles.logoImg}
          src={myCompany.logo}
          alt="로고이미지"
          onError={handleImageError}
        />
        <div className={styles.layoutContainer}>
          <p className={styles.companyName}>{myCompany.name}</p>
          <p className={styles.companyCategory}>{myCompany.category}</p>
        </div>
      </div>
    </div>
  );
}
export default InvestmentCompanyBrief;
