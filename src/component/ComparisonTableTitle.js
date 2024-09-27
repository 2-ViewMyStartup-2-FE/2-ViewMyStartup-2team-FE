import styles from "../css/ComparisonTableTitle.module.css";
function ComparisonTableTitle({ children }) {
  return <div className={styles.title}>{children}</div>;
}
export default ComparisonTableTitle;
