import styles from "../css/CompanyDetailPage.module.css";
import codeitLogo from "../asset/images/img_company_default_logo.png"; // 이미지 경로 수정

function CompanyDetailTable({ data }) {
  return (
    <>
      <div className={styles.company}>
        <img src={codeitLogo} alt="codeitLogo" />
        <div className={styles.companyName}>
          <h1>{data.name}</h1>
          <p>{data.category}</p>
        </div>
      </div>
      <div className={styles.companyInfo}>
        <div className={styles.companyDetailInfo}>
          <h1>누적 투자 금액</h1>
          <p>{data.totalInvestment}</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>매출액</h1>
          <p>{data.revenue}억 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>고용 인원</h1>
          <p>{data.employee}명</p>
        </div>
      </div>
      <div className={styles.introduction}>
        <h1>기업 소개</h1>
        <p>기업 소개란 입니다.</p>
      </div>
    </>
  );
}

export default CompanyDetailTable;
