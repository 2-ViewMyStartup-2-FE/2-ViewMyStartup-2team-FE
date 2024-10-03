import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStartup } from "../api/StartupAPI.js";
import styles from "../css/CompanyDetailPage.module.css";
import InvestmentInfoList from "../component/InvestmentInfoList.js";
import CompanyDetailTable from "../component/CompanyDetailTable.js";

export default function CompanyDetailPage() {
  const [startupData, setStartupData] = useState([]); // 스타트업 데이터 상태 관리
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStartup(id);

        if (response) {
          setStartupData(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.companyDetailPage}>
      <CompanyDetailTable data={startupData} />
      <InvestmentInfoList />
    </div>
  );
}
