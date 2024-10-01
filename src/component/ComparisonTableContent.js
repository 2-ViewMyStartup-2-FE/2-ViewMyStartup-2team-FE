import styles from "../css/ComparisonTableContent.module.css";

function ComparisonTableContent({ list, type }) {
  function toBillion(number) {
    return number / 100000000;
  }
  const NAMECONTENT = `${styles.name} ${styles.content}`;
  const DESCRIPTION = `${styles.description} ${styles.content}`;
  const OTHER = `${styles.other} ${styles.content}`;
  const RANKING = `${styles.ranking} ${styles.content}`;
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
        <tbody className={styles.contentBackground}>
          <tr className={styles.margin}></tr>
          {list.map((company) => (
            <tr className={styles.row} key={company.name}>
              {type === "ranking" && (
                <td className={RANKING}>{company.rank}위</td>
              )}
              <td className={NAMECONTENT}>
                <img
                  src={company.logo}
                  className={styles.logo}
                  alt="로고이미지"
                />
                <p>{company.name}</p>
              </td>
              <td className={DESCRIPTION}>{company.description}</td>
              <td className={OTHER}>{company.category}</td>
              <td className={OTHER}>
                {toBillion(company.totalInvestment)}억 원
              </td>
              <td className={OTHER}>{toBillion(company.revenue)}억 원</td>
              <td className={OTHER}>{company.employee}명</td>
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
