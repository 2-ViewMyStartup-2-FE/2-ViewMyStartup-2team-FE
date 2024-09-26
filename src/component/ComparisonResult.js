import styles from "../css/ComparisonResult.module.css";
import ComprisonHeader from "./ComprisonHeader.js";
import ComparisonTable from "./ComparisonTable.js";
function ComparisonResult() {
  const TITLE = "비교 결과 확인하기";
  const mockData = [
    {
      name: "코드잇",
      describe: "코드잇은 온라인 교육",
      category: "에듀테크",
      totalInvestment: "140억원",
      revenue: "50억원",
      employeeCount: "68명"
    },
    {
      name: "스타트업 A",
      describe: "스타트업 A는 혁신적인 기술 솔루션을 제공합니다.",
      category: "IT",
      totalInvestment: "200억원",
      revenue: "100억원",
      employeeCount: "120명"
    },
    {
      name: "헬로우 월드",
      describe: "헬로우 월드는 AI 기반의 고객 서비스 플랫폼입니다.",
      category: "테크",
      totalInvestment: "300억원",
      revenue: "150억원",
      employeeCount: "85명"
    },
    {
      name: "그린 에너지",
      describe: "그린 에너지는 지속 가능한 에너지 솔루션을 제공합니다.",
      category: "에너지",
      totalInvestment: "250억원",
      revenue: "80억원",
      employeeCount: "50명"
    },
    {
      name: "푸드 테크",
      describe: "푸드 테크는 식품 기술 혁신을 선도합니다.",
      category: "식품",
      totalInvestment: "180억원",
      revenue: "70억원",
      employeeCount: "40명"
    }
  ];

  return (
    <div className={styles.comparisonResult}>
      <ComprisonHeader title={TITLE} className={styles.margin} />
      <ComparisonTable mockData={mockData} />
    </div>
  );
}
export default ComparisonResult;
