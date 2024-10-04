import styles from "../css/ComparisonTableHeader.module.css";
import ComparisonTableTitle from "./ComparisonTableTitle.js";
import SortContent from "./SortContent.js";
function ComparisonTableHeader({
  title,
  className,
  onSelect,
  defaultOption,
  sortOption
}) {
  return (
    <div className={`${styles.header} ${className}`}>
      <ComparisonTableTitle>{title}</ComparisonTableTitle>
      <SortContent
        onSelect={onSelect}
        defaultOption={defaultOption}
        sortOption={sortOption}
      />
    </div>
  );
}
export default ComparisonTableHeader;
