import styles from "../css/ComparisonTableContent.module.css";

function ComparisonTableContent({ mockData, type }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            {type === "ranking" && <th className={styles.ranking}>순위</th>}
            <th className={styles.name}>기업 명</th>
            <th className={styles.description}>기업 소개</th>
            <th className={styles.other}>카테고리</th>
            <th className={styles.other}>누적 투자 금액</th>
            <th className={styles.other}>매출액</th>
            <th className={styles.other}>고용 인원</th>
          </tr>
        </thead>
        <tbody className={styles.content}>
          <tr className={styles.margin}></tr>
          {mockData.map((company) => (
            <tr className={styles.row} key={company.name}>
              {type === "ranking" && (
                <td className={styles.ranking}>{company.rank}위</td>
              )}
              <td className={styles.name}>{company.name}</td>
              <td className={styles.description}>{company.describe}</td>
              <td className={styles.other}>{company.category}</td>
              <td className={styles.other}>{company.totalInvestment}</td>
              <td className={styles.other}>{company.revenue}</td>
              <td className={styles.other}>{company.employeeCount}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={7} className={styles.marginBottom}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ComparisonTableContent;
