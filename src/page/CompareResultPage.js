import styles from "../css/CompareResultPage.module.css";
import ComparisonTable from "../component/ComparisonTable";
function CompareResultPage() {
  return (
    <div className={styles.compareResultPage}>
      <div
        className={`${styles.componentSize} ${styles.componentLayout}`}
      ></div>
      <ComparisonTable type="select" className={styles.selectTableLayout} />
      <ComparisonTable type="ranking" className={styles.rankingTableLayout} />
      <button className={styles.investBtn}>나의 기업에 투자하기</button>
    </div>
  );
}
export default CompareResultPage;
