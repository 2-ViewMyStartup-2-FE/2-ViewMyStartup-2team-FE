import styles from "../css/CompanyDetailPage.module.css";
import defaultImg from "../asset/images/img_company_default_logo.png";
import ConvertBillion from "../utils/ConvertBillion.js";
function CompanyDetailTable({ data }) {
  return (
    <>
      <div className={styles.company}>
        <img
          src={data.logo == "" ? defaultImg : data.logo}
          alt="Logo"
          onError={(e) => (e.target.src = defaultImg)}
        />
        <div className={styles.companyName}>
          <h1>{data.name}</h1>
          <p>{data.category}</p>
        </div>
      </div>
      <div className={styles.companyInfo}>
        <div className={styles.companyDetailInfo}>
          <h1>누적 투자 금액</h1>
          <p>{ConvertBillion(parseInt(data.totalInvestment))}원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>매출액</h1>
          <p>{ConvertBillion(parseInt(data.revenue))} 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>고용 인원</h1>
          <p>{data.employee}명</p>
        </div>
      </div>
      <div className={styles.introduction}>
        <h1>기업 소개</h1>
        <p>{data.description}</p>
      </div>
    </>
  );
}

export default CompanyDetailTable;
