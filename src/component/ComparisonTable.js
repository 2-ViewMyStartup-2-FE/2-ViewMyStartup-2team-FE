import styles from "../css/ComparisonTable.module.css";
import ComparisonHeader from "./ComparisonHeader.js";
import ComparisonTableContent from "./ComparisonTableContent.js";
function ComparisonTable({ type = "select", className = "", list }) {
  const SELECT = "select";
  const RANKING = "ranking";
  const selectTitle = "비교 결과 확인하기";
  const rankingTitle = "기업 순위 확인하기";
  const TITLE = type === "select" ? selectTitle : rankingTitle;
  const comparisonType = type === "select" ? SELECT : RANKING;
  const COMPARISONTABLE = `${styles.comparisonTable} ${className}`;
  return (
    <div className={COMPARISONTABLE}>
      <ComparisonHeader title={TITLE} className={styles.margin} />
      <ComparisonTableContent type={comparisonType} list={list} />
    </div>
  );
}
export default ComparisonTable;
