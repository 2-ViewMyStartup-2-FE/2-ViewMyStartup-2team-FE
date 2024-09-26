import styles from "./ComparisonResult.module.css";
import ComprisonHeader from "./ComprisonHeader";
function ComparisonResult() {
  const TITLE = "비교 결과 확인하기";
  return (
    <div className={styles.comparisonResult}>
      <ComprisonHeader title={TITLE} />
      <div>asdasd</div>
    </div>
  );
}
export default ComparisonResult;
