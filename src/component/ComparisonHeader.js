import styles from "../css/ComparisonTableHeader.module.css";
import ComparisonTableTitle from "./ComparisonTableTitle.js";
import SortSelector from "./SortSelector.js";
function ComparisonTableHeader({ title, className }) {
  return (
    <div className={`${styles.header} ${className}`}>
      <ComparisonTableTitle>{title}</ComparisonTableTitle>
      <SortSelector />
    </div>
  );
}
export default ComparisonTableHeader;
