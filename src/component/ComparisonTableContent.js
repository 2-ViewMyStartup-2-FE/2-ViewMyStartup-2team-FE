import styles from "../css/ComparisonTableContent.module.css";
import ConvertBillion from "../utils/ConvertBillion.js";
import defaultLogo from "../asset/images/img_company_default_logo.png";
function ComparisonTableContent({ list, type, myCompany }) {
  const isRanking = type === "ranking";
  const header = isRanking
    ? `${styles.rowRanking} ${styles.header}`
    : `${styles.row} ${styles.header}`;
  const row = isRanking ? `${styles.rowRanking}` : `${styles.row}`;
  const ROWCLASS = (company) =>
    `${row} ${company.name === myCompany.name ? styles.myCompany : ""}`;
  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <div className={header}>
          {isRanking && <div className={styles.cell}>순위</div>}
          <div className={styles.cell}>기업 명</div>
          <div className={styles.cell}>기업 소개</div>
          <div className={styles.cell}>카테고리</div>
          <div className={styles.cell}>누적 투자 금액</div>
          <div className={styles.cell}>매출액</div>
          <div className={styles.cell}>고용 인원</div>
        </div>
        {list.map((company) => (
          <div className={ROWCLASS(company)} key={company.name}>
            {isRanking && <div className={styles.cell}>{company.rank}위</div>}
            <div className={styles.logoAndName}>
              <img
                className={styles.logo}
                src={company.logo}
                onError={(e) => {
                  e.target.src = defaultLogo;
                }}
                alt="로고이미지"
              />
              <div className={styles.ellipsisName}>{company.name}</div>
            </div>
            <div className={styles.ellipsisDescription}>
              {company.description}
            </div>
            <div className={styles.cell}>{company.category}</div>
            <div className={styles.cell}>
              {ConvertBillion(company.totalInvestment)} 원
            </div>
            <div className={styles.cell}>
              {ConvertBillion(company.revenue)} 원
            </div>
            <div className={styles.cell}>{company.employee}명</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparisonTableContent;
