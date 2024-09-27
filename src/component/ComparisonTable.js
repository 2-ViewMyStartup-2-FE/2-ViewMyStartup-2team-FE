import styles from "../css/ComparisonTable.module.css";
import ComparisonHeader from "./ComparisonHeader.js";
import ComparisonTableContent from "./ComparisonTableContent.js";
function ComparisonTable({ type = "select", className = "" }) {
  const SELECT = "select";
  const RANKING = "ranking";
  const selectTitle = "비교 결과 확인하기";
  const rankingTitle = "기업 순위 확인하기";
  const TITLE = type === "select" ? selectTitle : rankingTitle;
  const comparisonType = type === "select" ? SELECT : RANKING;
  const COMPARISONTABLE = `${styles.comparisonTable} ${className}`;
  const mockData = [
    {
      name: "코드잇",
      rank: 14,
      describe: "코드잇은 온라인 교육",
      category: "에듀테크",
      totalInvestment: "140억원",
      revenue: "50억원",
      employeeCount: "68명"
    },
    {
      name: "스타트업 A",
      rank: 16,
      describe: "스타트업 A는 혁신적인 기술 솔루션을 제공합니다.",
      category: "IT",
      totalInvestment: "200억원",
      revenue: "100억원",
      employeeCount: "120명"
    },
    {
      name: "헬로우 월드",
      rank: 27,
      describe: "헬로우 월드는 AI 기반의 고객 서비스 플랫폼입니다.",
      category: "테크",
      totalInvestment: "300억원",
      revenue: "150억원",
      employeeCount: "85명"
    },
    {
      name: "그린 에너지",
      rank: 59,
      describe: "그린 에너지는 지속 가능한 에너지 솔루션을 제공합니다.",
      category: "에너지",
      totalInvestment: "250억원",
      revenue: "80억원",
      employeeCount: "50명"
    },
    {
      name: "푸드 테크",
      rank: 87,
      describe: "푸드 테크는 식품 기술 혁신을 선도합니다.",
      category: "식품",
      totalInvestment: "180억원",
      revenue: "70억원",
      employeeCount: "40명"
    }
  ];

  return (
    <div className={COMPARISONTABLE}>
      <ComparisonHeader title={TITLE} className={styles.margin} />
      <ComparisonTableContent mockData={mockData} type={comparisonType} />
    </div>
  );
}
export default ComparisonTable;
