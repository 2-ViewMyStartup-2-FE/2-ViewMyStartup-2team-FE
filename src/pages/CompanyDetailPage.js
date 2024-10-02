import styles from "../css/CompanyDetailPage.module.css";
import InvestmentInfoList from "../component/InvestmentInfoList.js";
import CompanyDetailTable from "../component/CompanyDetailTable.js";

export default function CompanyDetailPage() {
  const data = {
    id: "3cd245e0-f8b2-4a95-a10f-6dfc68e8c2d2",
    logo: "",
    name: "스타트업 B",
    description: "모바일 애플리케이션 개발 전문 스타트업입니다.",
    category: "모바일",
    totalInvestment: "15000" + "13000",
    revenue: 2000000,
    employee: 42,
    actualInvestAmount: "15000000000",
  };
  return (
    <div className={styles.companyDetailPage}>
      <CompanyDetailTable data={data} />
      <InvestmentInfoList />
    </div>
  );
}
