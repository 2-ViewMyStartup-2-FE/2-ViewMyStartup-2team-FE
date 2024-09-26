import styles from "./ComprisonHeader.module.css";
import ComprisonTitle from "./ComparisonTitle.js";
import SortOption from "./SortOption.js";
function ComprisonHeader({ title }) {
  return (
    <div className={styles.header}>
      <ComprisonTitle>{title}</ComprisonTitle>
      <SortOption />
    </div>
  );
}
export default ComprisonHeader;
