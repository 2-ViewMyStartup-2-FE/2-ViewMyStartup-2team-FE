import styles from "./ComparisonTitle.module.css";
function ComparisonTitle({ children }) {
  return <div className={styles.title}>{children}</div>;
}
export default ComparisonTitle;
