import styles from "../css/ComprisonHeader.module.css";
import ComprisonTitle from "./ComparisonTitle.js";
import SortSelector from "./SortSelector.js";
function ComprisonHeader({ title, className }) {
  return (
    <div className={`${styles.header} ${className}`}>
      <ComprisonTitle>{title}</ComprisonTitle>
      <SortSelector />
    </div>
  );
}
export default ComprisonHeader;
