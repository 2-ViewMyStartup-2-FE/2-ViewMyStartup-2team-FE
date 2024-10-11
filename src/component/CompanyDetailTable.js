import styles from "../css/CompanyDetailPage.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";
import formatAmount from "../utils/formatAmount.js";

function CompanyDetailTable({ startupListData }) {
  const logoSrc =
    startupListData.logo === "" ? defaultImg : startupListData.logo;
  const handleImageError = (e) => (e.target.src = defaultImg);

  return (
    <>
      <div className={styles.company}>
        <img src={logoSrc} alt="Logo" onError={handleImageError} />
        <div className={styles.companyName}>
          <h1>{startupListData.name}</h1>
          <p>{startupListData.category}</p>
        </div>
      </div>
      <div className={styles.companyInfo}>
        <div className={styles.companyDetailInfo}>
          <h1>누적 투자 금액</h1>
          <p>{formatAmount(startupListData.totalInvestment)} 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>매출액</h1>
          <p>{formatAmount(startupListData.revenue)} 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>고용 인원</h1>
          <p>{startupListData.employee}명</p>
        </div>
      </div>
      <div className={styles.introduction}>
        <h1>기업 소개</h1>
        <p>{startupListData.description}</p>
      </div>
    </>
  );
}

export default CompanyDetailTable;
