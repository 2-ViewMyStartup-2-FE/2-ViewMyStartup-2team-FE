import { Link } from "react-router-dom";
import styles from "../css/CompanyDetailPage.module.css";
import codeitLogo from "../asset/images/codeitLogo.png";
import kebabIcon from "../asset/images/ic_kebab.png";
import Pagination from "../component/Pagination.js";

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

      <div className={styles.investInfoSection}>
        <div className={styles.investInfoTitle}>
          <h1>View My Startup에서 받은 투자</h1>
          <Link className={styles.investBtn}>기업투자하기</Link>
        </div>
        <div className={styles.investment}>총 200억 원</div>
        <div className={styles.investInfo}>
          <div className={styles.investDetailTitle}>
            <h1>투자자 이름</h1>
            <h1>순위</h1>
            <h1>투자 금액</h1>
            <h1>투자 코멘트</h1>
          </div>
          <div className={styles.investDetail}>
            <h1>김연우</h1>
            <h1>1위</h1>
            <h1>10억</h1>
            <h1>코드잇 정말 훌륭한 기업입니다!</h1>
            <img src={kebabIcon} alt="kebabIcon" />
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
}
