import styles from "../css/CompanyDetailPage.module.css";
import codeitLogo from "../asset/images/codeitLogo.png";
import InvestmentInfoList from "../component/InvestmentInfoList.js";

export default function CompanyDetailPage() {
  return (
    <div className={styles.companyDetailPage}>
      <div className={styles.company}>
        <img src={codeitLogo} alt="codeitLogo" />
        <div className={styles.companyName}>
          <h1>코드잇</h1>
          <p>에듀테크</p>
        </div>
      </div>
      <div className={styles.companyInfo}>
        <div className={styles.companyDetailInfo}>
          <h1>누적 투자 금액</h1>
          <p>140억 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>매출액</h1>
          <p>44.3억 원</p>
        </div>
        <div className={styles.companyDetailInfo}>
          <h1>고용 인원</h1>
          <p>95명</p>
        </div>
      </div>

      <div className={styles.introduction}>
        <h1>기업 소개</h1>
        <p>기업 소개란 입니다.</p>
      </div>

      <InvestmentInfoList />
    </div>
  );
}
