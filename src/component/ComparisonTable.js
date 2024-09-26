import styles from "../css/ComparisonTable.module.css";

function ComparisonTable({ mockData }) {
  const COMPANY_NAME = `${styles.comparisonItem} ${styles.nameSize}`;
  const COMPANY_DESCRIPTION = `${styles.comparisonItem} ${styles.descriptionSize}`;
  const COMPANY_OTHER = `${styles.comparisonItem} ${styles.autoSize}`;
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <th className={COMPANY_NAME}>기업 명</th>
            <th className={COMPANY_DESCRIPTION}>기업 소개</th>
            <th className={COMPANY_OTHER}>카테고리</th>
            <th className={COMPANY_OTHER}>누적 투자 금액</th>
            <th className={COMPANY_OTHER}>매출액</th>
            <th className={COMPANY_OTHER}>고용 인원</th>
          </tr>
        </thead>
        <tbody className={styles.content}>
          <tr className={styles.margin}></tr>
          {mockData.map((company, index) => (
            <tr className={styles.row} key={company.name}>
              <td className={COMPANY_NAME}>{company.name}</td>
              <td className={COMPANY_DESCRIPTION}>{company.describe}</td>
              <td className={COMPANY_OTHER}>{company.category}</td>
              <td className={COMPANY_OTHER}>{company.totalInvestment}</td>
              <td className={COMPANY_OTHER}>{company.revenue}</td>
              <td className={COMPANY_OTHER}>{company.employeeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTable;
